const Subscription = require('egg').Subscription;

class WeixinDriver extends Subscription {
    static get schedule() {
        return {
            interval: '180s',
            type: 'worker'
        };
    }
    async subscribe() {
        console.log("OK")
        await this.ctx.service.weixin.start();
    }
}

module.exports = WeixinDriver;