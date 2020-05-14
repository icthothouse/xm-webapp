import { Injectable, InjectionToken } from '@angular/core';

export const XM_CORE_EXTERNAL_CONFIG = new InjectionToken<XmCoreConfig>('XM_CORE_EXTERNAL_CONFIG');

@Injectable({providedIn: 'root'})
export class XmCoreConfig {
    public SERVER_API_URL: string = '';
    public UI_PUBLIC_CONFIG_URL: string = `${this.SERVER_API_URL}config/api/profile/webapp/settings-public.yml?toJson`;
    public UI_PRIVATE_CONFIG_URL: string = `${this.SERVER_API_URL}config/api/profile/webapp/settings-private.yml?toJson`;
    public UI_PRIVATE_CONFIG_PERMISSION: string = 'CONFIG.CLIENT.WEBAPP.GET_LIST.ITEM';
    public USER_URL: string = `${this.SERVER_API_URL}uaa/api/account`;
}
