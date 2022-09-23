'use strict';

const Service = require('egg').Service;

class DbService extends Service {
    async update_biz_time(biz){
        const now_time_13 = new Date().getTime();
        const now_time = Math.floor(now_time_13 / 1000);
        const row = {
            'update_time': now_time
        }
        const options = {
            where: {
                'biz': biz
            }
        };
        const result = await this.app.mysql.update('admin_weixin_urls', row, options); // 更新 admin_weixin_urls 表中的记录
        const updateSuccess = result.affectedRows === 1;
        return updateSuccess;
    }

    async select_1_biz_order_by_update_time(type){
        const rows = await this.app.mysql.select('admin_weixin_urls', {
            orders: [['update_time', 'asc']],
            where: {'type': type}
        });
        const now_time_13 = new Date().getTime();
        const now_time = Math.floor(now_time_13 / 1000);
        for(let i=0;i<rows.length;i++){
            let crawl_time = Math.floor(rows[i].update_time + rows[i].interval);
            if(now_time > crawl_time){
                console.log('Find Biz!');
                console.log(rows[i]);
                return rows[i];
            }
        }
        return null;
    }
}

module.exports = DbService;