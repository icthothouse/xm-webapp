import { ErrorHandler, Injectable } from '@angular/core';
import { XmSessionService } from '@xm-ngx/core';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

    constructor(private sessionService: XmSessionService) {
        super();
    }

    public handleError(error: any): void {
        const chunkFailedMessage = /Loading chunk [\d]+ failed/;

        if (chunkFailedMessage.test(error.message)) {
            this.sessionService.clear();
        } else {
            super.handleError(error);
        }
    }
}
