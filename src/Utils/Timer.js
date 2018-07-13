class Timer {
    constructor(listener) {
        this.listener = listener;
    }

    start(time) {
        var self = this;

        function call(func) {
            func();
            return func;
        }

        this.interval = setInterval(call(function tick() {
            self.listener((Date.now || function () {
                return +new Date;
            })());
        }), time);
    }

    stop() {
        clearInterval(this.interval);
    }
}

module.exports = Timer;

