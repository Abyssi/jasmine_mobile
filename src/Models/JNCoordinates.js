const JsonSerializable = require('../Utils/JsonSerializable.js');

class JNCoordinates extends JsonSerializable {
    constructor(latitude, longitude) {
        super();

        this.latitude = latitude;
        this.longitude = longitude;
    }
}

module.exports = JNCoordinates;