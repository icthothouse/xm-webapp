import * as _ from 'lodash';

export function getValue<T>(entity: unknown, field: string): T {
    if (field === null || field === undefined || field === '') {
        return entity as T;
    } else {
        return _.get(entity, field, null);
    }
}
