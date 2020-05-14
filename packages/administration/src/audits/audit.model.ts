import { AuditData } from './audit-data.model';

export interface Audit {
    data: AuditData;
    principal: string;
    timestamp: string;
    type: string;
}
