import { XmDynamicEntry } from '@xm-ngx/dynamic';

export const XM_TABLE_ELEMENTS: XmDynamicEntry[] = [
    {
        selector: '@xm-ngx/components/table-column-dynamic-cells',
        loadChildren: () => import('./column/xm-table-column-dynamic-cells').then(m => m.XmTableColumnDynamicCellsModule),
    },
];
