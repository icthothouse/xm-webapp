import { Injectable } from '@angular/core';

@Injectable()
export class XmAuthenticationConfig {
    public errorCodeUnauthorized = 401;
    public tokenUrl = 'uaa/oauth/token';
}
