const JsonSerializable = require('../Utils/JsonSerializable.js');

class JNMobile extends JsonSerializable {
    constructor(id, position, speed) {
        super();

        this.id = id;
        this.position = position;
        this.speed = speed;
    }
}

module.exports = JNMobile;