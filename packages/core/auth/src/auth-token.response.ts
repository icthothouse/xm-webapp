import { GuestTokenResponse } from './guest-token.response';

export interface AuthTokenResponse extends GuestTokenResponse {
    refresh_token: string;
    expires_in: number;
}
