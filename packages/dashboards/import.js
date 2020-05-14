const request = require('sync-request');
const logger = console;
const args = require('yargs').argv;
const fs = require('fs');

request.debug = true;

const xmurl = args.xmurl || process.env.npm_config_xmurl || process.env.xmurl || '';
const xmgrant = args.xmgrant || process.env.npm_config_xmgrant || process.env.xmgrant || '';
const xmauth = args.xmauth || process.env.npm_config_xmauth || process.env.xmauth || '';
const target = args.dist || process.env.npm_config_target || process.env.target || 'dist/dashboards.json';
const _deleteFile = args.deleteFile || process.env.npm_config_deleteFile || process.env.deleteFile || false;

function deleteFile(target) {
    logger.debug('XM start deleteFile');
    fs.unlinkSync(target);
    logger.debug('XM end deleteFile');
}

function loadFile(target) {
    logger.debug('XM start loadWidgets');
    const contents = fs.readFileSync(target, {encoding: 'utf-8'});
    const jsonContent = JSON.parse(contents);
    logger.debug(`XM end loadWidgets dashboards.length=${jsonContent.dashboards.length}`);
    return jsonContent;
}

function prepareRequest(jsonContent) {
    logger.debug('XM start prepareRequest');
    const dashboardsNew = jsonContent.dashboards.map((dashboardOld) => {
        dashboardOld.widgets = jsonContent.widgets.filter((i) => i.dashboard === dashboardOld.id);
        delete dashboardOld.id;

        dashboardOld.widgets.forEach((i) => {
            delete i.dashboard;
            delete i.id;
        });
        return dashboardOld;
    });

    logger.debug('XM end prepareRequest');
    return dashboardsNew;
}

class ImportDashboards {
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
            'Authorization': 'Bearer ' + this.accessToken,
            'Content-type': 'application/json'
        };
        logger.debug('XM end getAccessToken');
    }

    dropDashboards() {
        logger.debug('XM start dropDashboards');
        const res = request('GET', this.url + '/dashboard/api/dashboards', {'headers': this.headers});
        const data = JSON.parse(res.getBody());
        data.forEach((dashboard) => {
            request('DELETE', this.url + '/dashboard/api/dashboards/' + dashboard.id, {
                headers: this.headers
            });
            logger.debug(`XM dropDashboards "${dashboard.name}" removed`);
        });

        logger.debug('XM end dropDashboards');
    }

    saveWidgets(dashboards) {
        logger.debug('XM start loadWidgets');
        dashboards.forEach((dashboard) => {
            request('POST', this.url + '/dashboard/api/dashboards', {
                headers: this.headers,
                body: JSON.stringify(dashboard)
            });
            logger.debug(`XM loadWidgets "${dashboard.name}" created`);
        });
        logger.debug('XM end loadWidgets ');
    }

}

(function main() {
    logger.info('XM start dashboards import');
    const dashboard = new ImportDashboards();
    dashboard.connect(xmurl, xmgrant, xmauth);
    const file = loadFile(target);
    const req = prepareRequest(file);
    dashboard.dropDashboards();
    dashboard.saveWidgets(req);
    if (_deleteFile) {
        deleteFile(target);
    }
    logger.info('XM end dashboards import');
})();
