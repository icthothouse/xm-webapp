import { BaseEntity } from '@xm-ngx/entity';

export interface Widget<C = any> extends BaseEntity {
    id?: number;
    config?: C;
    dashboard?: number
        /*
         * Backward compatibility,
         * @todo: Backend, improve dashboard-microservice
         */
        | { id?: number } | any;
    isPublic?: boolean;
    name?: string;
    selector?: string;

    /*
     * Backward compatibility, @deprecated
     * @todo: add generics
     */
    [key: string]: any;

}
