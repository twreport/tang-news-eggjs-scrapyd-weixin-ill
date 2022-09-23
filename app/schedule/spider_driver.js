const Subscription = require('egg').Subscription;

class SpiderDriver extends Subscription {
    static get schedule() {
        return {
            interval: '60s',
            type: 'worker'
        };
    }
    async subscribe() {
        console.log("OK")
        await this.ctx.service.driver.start();
    }
}

module.exports = SpiderDriver;