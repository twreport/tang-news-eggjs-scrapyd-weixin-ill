'use strict';
const Service = require('egg').Service;

class WeixinService extends Service {
    async start() {
        console.log('Start Spide!');
        await this.weixinDriver();
    }


    // 定时执行scrapy任务
    async weixinDriver() {
        const scrapyd_server_url = this.app.config.ScrapydServerUrl;
        // 拼接curl地址
        const url = scrapyd_server_url + "schedule.json";

        //预留uin，以备未来微信终端增加后分组
        const biz = await this.get_1_biz('scrapyd');
        console.log("===========================biz========================")
        console.log(biz)
        if(biz !== false){
            const data = {
                'project': 'weixin',
                'spider': 'wechat',
                'biz': biz.biz,
                'db': biz.db,
                'wx_name': biz.name
            }
            const result = await this.ctx.curl(
                url, {
                    method: 'POST',
                    data: data,
                    dataType: 'json'
                }
            );
            console.log(result)
        }
    }


    //从需要实时监控的biz中和需要分析log的biz中各取一个
    //随机确定选哪个
    async get_1_biz(uin) {
        console.log("uin in func get_1_biz:");
        console.log(uin);

        //1-优先爬取type为1的biz
        let biz = await this.service.db.select_1_biz_order_by_update_time(1);
        if(biz != null){
            const res_1 = await this.service.db.update_biz_time(biz.biz);
            if(res_1 === true){
                console.log('Find Biz Type 1！');
                console.log(biz);
                return biz;
            }else{
                console.log('Update Biz Time Error！');
                return false;
            }
        }else{
            //2-如果没有需要爬取的type为1的biz，则寻找需要爬取的其他biz
            biz = await this.service.db.select_1_biz_order_by_update_time(3);
            if(biz != null) {
                const res_2 = await this.service.db.update_biz_time(biz.biz);
                if (res_2 === true) {
                    console.log('Find Biz Type 3！');
                    console.log(biz);
                    return biz;
                } else {
                    console.log('Update Biz Time Error！');
                    return false;
                }
            }else{
                console.log('No Biz Needs Crawl！');
                return false;
            }
        }
    }
}

module.exports = WeixinService;