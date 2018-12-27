import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SlackSharedModule } from 'app/shared';
import {
    WorkspaceComponent,
    WorkspaceDetailComponent,
    WorkspaceUpdateComponent,
    WorkspaceDeletePopupComponent,
    WorkspaceDeleteDialogComponent,
    workspaceRoute,
    workspacePopupRoute
} from './';

const ENTITY_STATES = [...workspaceRoute, ...workspacePopupRoute];

@NgModule({
    imports: [SlackSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        WorkspaceComponent,
        WorkspaceDetailComponent,
        WorkspaceUpdateComponent,
        WorkspaceDeleteDialogComponent,
        WorkspaceDeletePopupComponent
    ],
    entryComponents: [WorkspaceComponent, WorkspaceUpdateComponent, WorkspaceDeleteDialogComponent, WorkspaceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SlackWorkspaceModule {}
