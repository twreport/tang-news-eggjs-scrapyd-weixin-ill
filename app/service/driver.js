'use strict';
const Service = require('egg').Service;

class DriverService extends Service {
    async start() {
        console.log('Start Spide!');
        await this.spiderDriverGuizhouweijianwei();
        await this.spiderDriverGuiyangweijianwei();
        await this.spiderDriverDizhensubao();
    }

    async spiderDriverGuizhouweijianwei() {
        const scrapyd_server_url = this.app.config.ScrapydServerUrl;

        // 拼接curl地址
        const url = scrapyd_server_url + "schedule.json";
        const data = {
            'project': 'guizhouweijianwei',
            'spider': 'weijianwei'
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

    async spiderDriverGuiyangweijianwei() {
        const scrapyd_server_url = this.app.config.ScrapydServerUrl;

        // 拼接curl地址
        const url = scrapyd_server_url + "schedule.json";
        const data = {
            'project': 'guiyangweijianwei',
            'spider': 'gywjw'
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

    async spiderDriverDizhensubao(){
        const scrapyd_server_url = this.app.config.ScrapydServerUrl;

        // 拼接curl地址
        const url = scrapyd_server_url + "schedule.json";
        const data = {
            'project': 'dizhensubao',
            'spider': 'dizhen'
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

module.exports = DriverService;