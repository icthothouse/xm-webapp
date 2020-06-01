import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    Framework,
    FrameworkLibraryService,
    JsonSchemaFormModule,
    JsonSchemaFormService,
    MaterialDesignFramework,
    MaterialDesignFrameworkModule,
    WidgetLibraryService,
} from 'angular2-json-schema-form';
import { TagInputModule } from 'ngx-chips';
import { ImageCropperModule } from 'ngx-img-cropper';
import { RatingModule } from 'ngx-rating';
import { XmSharedModule } from '../shared/shared.module';
import {
    AreaComponent,
    AttachmentCardComponent,
    AttachmentDetailDialogComponent,
    AttachmentListComponent,
    AttachmentService,
    AvatarDialogComponent,
    CalendarCardComponent,
    CalendarEventDialogComponent,
    CalendarService,
    CommentCardComponent,
    CommentDetailDialogComponent,
    CommentListComponent,
    CommentService,
    ContentService,
    EntityCardCompactComponent,
    EntityCardComponent,
    EntityDataCardComponent,
    EntityDetailDialogComponent,
    EntityDetailFabComponent,
    EntityListCardComponent,
    EntityListFabComponent,
    EntityStateComponent,
    EventService,
    FunctionCallDialogComponent,
    FunctionContextService,
    FunctionListSectionCompactComponent,
    FunctionListSectionComponent,
    FunctionService,
    LinkDetailDialogComponent,
    LinkDetailNewSectionComponent,
    LinkDetailSearchSectionComponent,
    LinkedinDataItemComponent,
    LinkedinProfileComponent,
    LinkListCardComponent,
    LinkListComponent,
    LinkListTreeSectionComponent,
    LinkService,
    LocationCardNamePipe,
    LocationDetailDialogComponent,
    LocationListCardComponent,
    LocationService,
    OsmPolygonDialogComponent,
    OverpassApiService,
    RatingListSectionComponent,
    RatingService,
    StatesManagementDialogComponent,
    TagListSectionComponent,
    TagService,
    VoteService,
    XmEntityService,
    XmEntitySpecService,
    XmEntitySpecWrapperService,
} from './';
import { AttachmentListBaseComponent } from './attachment-list/attachment-list-base.component';
import { AttachmentListSimplifiedComponent } from './attachment-list/attachment-list-simplified.component';

import { StateChangeDialogComponent } from './state-change-dialog/state-change-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        XmSharedModule,
        RouterModule,
        MaterialDesignFrameworkModule,
        {
            ngModule: JsonSchemaFormModule,
            providers: [
                JsonSchemaFormService,
                FrameworkLibraryService,
                WidgetLibraryService,
                {provide: Framework, useClass: MaterialDesignFramework, multi: true},
            ],
        },
        ImageCropperModule,
        RatingModule,
        TagInputModule,
    ],
    declarations: [
        AreaComponent,
        AttachmentCardComponent,
        AttachmentDetailDialogComponent,
        AttachmentListComponent,
        AvatarDialogComponent,
        CalendarCardComponent,
        CalendarEventDialogComponent,
        CommentCardComponent,
        CommentDetailDialogComponent,
        CommentListComponent,
        EntityCardComponent,
        EntityCardCompactComponent,
        EntityDataCardComponent,
        EntityDetailDialogComponent,
        EntityDetailFabComponent,
        EntityListCardComponent,
        EntityListFabComponent,
        EntityStateComponent,
        FunctionCallDialogComponent,
        StateChangeDialogComponent,
        FunctionListSectionComponent,
        FunctionListSectionCompactComponent,
        LinkDetailDialogComponent,
        LinkDetailNewSectionComponent,
        LinkDetailSearchSectionComponent,
        LinkedinProfileComponent,
        LinkedinDataItemComponent,
        LinkListComponent,
        LinkListCardComponent,
        LinkListTreeSectionComponent,
        LocationDetailDialogComponent,
        LocationListCardComponent,
        OsmPolygonDialogComponent,
        RatingListSectionComponent,
        TagListSectionComponent,
        EntityListFabComponent,
        LocationCardNamePipe,
        StatesManagementDialogComponent,
        AttachmentListSimplifiedComponent,
        AttachmentListBaseComponent,
    ],
    entryComponents: [
        StatesManagementDialogComponent,
        AttachmentDetailDialogComponent,
        AvatarDialogComponent,
        CalendarEventDialogComponent,
        CommentDetailDialogComponent,
        EntityDetailDialogComponent,
        FunctionCallDialogComponent,
        StateChangeDialogComponent,
        LinkDetailDialogComponent,
        LocationDetailDialogComponent,
        OsmPolygonDialogComponent,
    ],
    exports: [
        AreaComponent,
        AttachmentCardComponent,
        AttachmentListComponent,
        AttachmentListSimplifiedComponent,
        CalendarCardComponent,
        CommentCardComponent,
        CommentListComponent,
        EntityCardComponent,
        EntityCardCompactComponent,
        EntityDataCardComponent,
        EntityDetailFabComponent,
        EntityListCardComponent,
        EntityListFabComponent,
        EntityStateComponent,
        FunctionListSectionComponent,
        FunctionListSectionCompactComponent,
        LinkDetailNewSectionComponent,
        LinkDetailSearchSectionComponent,
        LinkListComponent,
        LinkListCardComponent,
        LocationListCardComponent,
        RatingListSectionComponent,
        TagListSectionComponent,
        StatesManagementDialogComponent,
        FunctionCallDialogComponent,
    ],
    providers: [
        AttachmentService,
        CalendarService,
        CommentService,
        ContentService,
        EventService,
        FunctionService,
        FunctionContextService,
        LinkService,
        LocationService,
        OverpassApiService,
        RatingService,
        TagService,
        VoteService,
        XmEntityService,
        XmEntitySpecService,
        XmEntitySpecWrapperService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class XmEntityModule {
}
