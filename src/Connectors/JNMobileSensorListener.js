const SerialPort = require('serialport');
const JNMobileSensorMessage = require('./Messages/JNMobileSensorMessage');

class JNMobileSensorListener {
    constructor(listener) {
        this.listener = listener;
        this.state = "STOPPED";
    }

    send(message) {
        if (this.state === "RUNNING")
            this.listener(message);
    }

    start() {
        this.state = "RUNNING";
    }

    stop() {
        this.state = "STOPPED";
    }
}

class JNMobileSensorIPCListener extends JNMobileSensorListener {
    constructor(topic, listener) {
        super(listener);

        this.setup(topic);
    }

    setup(topic) {
        process.on(topic, message => {
            this.send(message);
        });
    }
}

class JNMobileSensorSerialListener extends JNMobileSensorListener {
    constructor(port, rate, listener) {
        super(listener);

        this.setup(port, rate);
    }

    setup(port, rate) {
        const serialPort = new SerialPort(port, {
            baudRate: rate,
            dataBits: 8,
            parity: 'none',
            stopBits: 1,
            flowControl: false
        });

        serialPort.on("open", function () {
            let receivedData = "";
            serialPort.on('data', function (data) {
                receivedData += data.toString();
                if (receivedData.indexOf('\n') >= 0) {
                    const message = receivedData.substring(0, receivedData.indexOf('\n') + 1);
                    receivedData = receivedData.substring(receivedData.indexOf('\n') + 1, receivedData.length);

                    this.send(message);
                }
            });
        });
    }
}

module.exports = {JNMobileSensorListener, JNMobileSensorIPCListener, JNMobileSensorSerialListener};