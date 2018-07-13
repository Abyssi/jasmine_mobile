const JNMobile = require('../Models/JNMobile.js');
const Timer = require('../Utils/Timer.js');
const JNMobileMessage = require('../Connectors/Messages/JNMobileMessage.js');
const JNMobileSensorListener = require('../Connectors/JNMobileSensorListener.js');
const JNKafkaProducer = require('../Connectors/JNKafkaProducer.js');

const MethodBinder = require('../Utils/MethodBinder.js');

class JNMobileCore {
    constructor(id, time, listener, producer) {
        MethodBinder.bindMethods(this, ['onSensorMessage', 'producerTick']);

        this.mobile = new JNMobile(id);
        this.listener = listener;
        this.producer = producer;

        this.listener.listener = this.onSensorMessage;
        this.listener.start();

        this.timer = new Timer(this.producerTick);
        this.timer.start(time);
    }

    onSensorMessage(message) {
        this.mobile.position = message.position;
        this.mobile.speed = parseFloat(message.speed);
    }

    producerTick(timestamp) {
        if (this.mobile.position != null)
            this.producer.send(new JNMobileMessage(this.mobile.id, timestamp, this.mobile.position, this.mobile.speed).toJSONString);
    }
}

class JNMobileVirtualCore extends JNMobileCore {
    constructor(id, time, host, topic) {
        super(id, time, new JNMobileSensorListener.JNMobileSensorListener(), new JNKafkaProducer(host, topic));
    }
}

class JNMobileProcessCore extends JNMobileCore {
    constructor(id, time, host, topic) {
        super(id, time, new JNMobileSensorListener.JNMobileSensorIPCListener('message'), new JNKafkaProducer(host, topic));
    }
}

class JNMobileRealCore extends JNMobileCore {
    constructor(id, time, host, topic) {
        super(id, time, new JNMobileSensorListener.JNMobileSensorSerialListener('/dev/tty-usbserial1', 9600), new JNKafkaProducer(host, topic));
    }
}

module.exports = {JNMobileCore, JNMobileVirtualCore, JNMobileProcessCore, JNMobileRealCore};