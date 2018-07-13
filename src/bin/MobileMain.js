const JNMobileCore = require('./JNMobileCore.js');

class MobileMain {
    constructor(argv) {
        const config = require(argv.hasOwnProperty("config_path") ? argv["config_path"] : './config.json');
        const type = argv.hasOwnProperty("type") ? argv["type"] : 'real';
        const time = argv.hasOwnProperty("time") ? argv["time"] : 1000;
        const kafkaBroker = argv.hasOwnProperty("kafka_broker") ? argv["kafka_broker"] : 'localhost:9092';
        const kafkaTopic = argv.hasOwnProperty("kafka_topic") ? argv["kafka_topic"] : 'mobile-topic';

        const types = {
            'virtual': JNMobileCore.JNMobileVirtualCore,
            'process': JNMobileCore.JNMobileProcessCore,
            'real': JNMobileCore.JNMobileRealCore
        };

        this.core = new types[type](config.id, time, kafkaBroker, kafkaTopic);
    }
}

module.exports = MobileMain;