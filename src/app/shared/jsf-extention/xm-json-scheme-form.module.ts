import {
    Framework,
    FrameworkLibraryService,
    JsonSchemaFormModule,
    JsonSchemaFormService,
    WidgetLibraryService,
} from '@ajsf/core';
import { MaterialDesignFramework, MaterialDesignFrameworkModule } from '@ajsf/material';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const _JsonSchemaFormModule = {
    ngModule: JsonSchemaFormModule,
    providers: [
        JsonSchemaFormService,
        FrameworkLibraryService,
        WidgetLibraryService,
        {provide: Framework, useClass: MaterialDesignFramework, multi: true},
    ],
};

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MaterialDesignFrameworkModule,
        _JsonSchemaFormModule,
    ],
    exports: [
        MaterialDesignFrameworkModule,
        JsonSchemaFormModule,
    ],
})
export class XmJsonSchemeFormModule {
}
