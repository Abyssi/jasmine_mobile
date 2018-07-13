const Kafka = require('node-rdkafka');

class JNKafkaProducer {
    constructor(brokers, topic) {
        this.stream = Kafka.Producer.createWriteStream({
            'metadata.broker.list': brokers
        }, {}, {
            topic: topic
        });

        this.stream.on('error', function (err) {
            console.error(err);
        });
    }

    send(message) {
        console.log("[Message sent to Kafka] " + message);
        this.stream.write(Buffer.from(message), 'utf8');
    }
}

module.exports = JNKafkaProducer;



