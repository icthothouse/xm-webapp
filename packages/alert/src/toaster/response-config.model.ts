import * as _ from 'lodash';

export class ResponseConfig {
    constructor(public responses: ResponseConfigItem[]) {
    }

    public getResponseConfigItem(rc: any): ResponseConfigItem {
        return this.responses.filter((r) => {
            return r.isMatch(rc);
        })[0];
    }
}

export class ResponseConfigItem {
    constructor(public code?: string,
                public codePath?: string,
                public status?: string,
                public type?: string,
                public validationField?: string,
                public validationFieldsExtractor?: string,
                public outputMessage?: {
                    type: string;
                    value: string;
                },
                public condition?: any,
                public redirectUrl?: string) {
    }

    public isMatch(rc: ResponseContext): boolean {
        const regExp = new RegExp(this.code);
        if ((this.status != null) && this.status !== rc.response.status) {
            return false;
        }
        if ((this.code != null) && !(regExp.test(_.get(rc.response.error, this.codePath)))) {
            return false;
        }
        try {
            if ((this.condition != null) && !new Function('rc', this.condition)(rc)) {
                return false;
            }
        } catch (e) {
            console.warn(e);
            return false;
        }

        return true;
    }
}

export interface ResponseContext {
    response?: { status: string; error: any };
    request?: any;
}
