const request = require('sync-request');
const logger = console;
const args = require('yargs').argv;
const fs = require('fs');

const xmurl = args.xmurl || process.env.npm_config_xmurl || process.env.xmurl || '';
const xmgrant = args.xmgrant || process.env.npm_config_xmgrant || process.env.xmgrant || '';
const xmauth = args.xmauth || process.env.npm_config_xmauth || process.env.xmauth || '';
const dist = args.dist || process.env.npm_config_dist || process.env.dist || 'dist/dashboards.json';

function saveJson(path, data) {
    let dir = path.split('/');
    dir.pop();
    dir = dir.join('/');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }

    fs.writeFileSync(path, JSON.stringify(data, null, 4), {encoding: 'utf8'});
}

class ExportDashboards {
    connect(url, grant, auth) {
        logger.debug('XM start getAccessToken');

        const res = request('POST', url + '/uaa/oauth/token', {
            body: grant,
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const data = JSON.parse(res.getBody());

        this.url = url;
        this.accessToken = data.access_token;
        this.headers = {
            'Authorization': 'Bearer ' + this.accessToken
        };
        logger.debug('XM end getAccessToken');
    }

    getDashboards() {
        logger.debug('XM start getDashboards');

        const res = request('GET', this.url + '/dashboard/api/dashboards', {'headers': this.headers});
        const data = JSON.parse(res.getBody());

        logger.debug('XM end getDashboards length=' + data.length);
        return data;
    }

    getWidgets() {
        logger.debug('XM start getWidgets');

        const res = request('GET', this.url + '/dashboard/api/widgets', {'headers': this.headers});
        const data = JSON.parse(res.getBody());

        logger.debug('XM end getWidgets length=' + data.length);
        return data;
    }

}

(function main() {
    logger.info('XM start dashboards export');
    const dashboard = new ExportDashboards();

    dashboard.connect(xmurl, xmgrant, xmauth);
    const dashboards = dashboard.getDashboards();
    const widgets = dashboard.getWidgets();

    saveJson(dist, {dashboards, widgets});
    logger.info('XM end dashboards export');
})();
