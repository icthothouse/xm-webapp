import { Injectable } from '@angular/core';

export const ITEMS_PER_PAGE = 10;

@Injectable({providedIn: 'root'})
export class PaginationConfig {
    public ITEMS_PER_PAGE: number = ITEMS_PER_PAGE;
}
