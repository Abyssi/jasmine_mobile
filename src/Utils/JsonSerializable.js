class JsonSerializable {
    get toJSONString() {
        return JSON.stringify(this);
    }

    static FromJSONString(type, string) {
        return new type(JSON.parse(string));
    }
}

module.exports = JsonSerializable;

