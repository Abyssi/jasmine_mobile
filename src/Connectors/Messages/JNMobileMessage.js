const JsonSerializable = require('../../Utils/JsonSerializable.js');

class JNMobileMessage extends JsonSerializable {
    constructor(id, timestamp, position, speed) {
        super();
        this.id = id;
        this.timestamp = timestamp;
        this.position = position;
        this.speed = speed;
    }
}

module.exports = JNMobileMessage;