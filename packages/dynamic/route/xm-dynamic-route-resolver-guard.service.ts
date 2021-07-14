import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

@Injectable()
export abstract class XmDynamicRouteResolverGuard {
    public abstract getRoutes(): Routes | null ;
}
