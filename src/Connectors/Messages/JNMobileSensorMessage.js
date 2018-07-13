const JsonSerializable = require('../../Utils/JsonSerializable.js');

class JNMobileSensorMessage extends JsonSerializable {
    constructor(speed, position) {
        super();
        this.position = position;
        this.speed = speed;
    }
}

module.exports = JNMobileSensorMessage;