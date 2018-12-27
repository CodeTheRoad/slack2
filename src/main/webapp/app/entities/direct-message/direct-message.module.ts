import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SlackSharedModule } from 'app/shared';
import {
    DirectMessageComponent,
    DirectMessageDetailComponent,
    DirectMessageUpdateComponent,
    DirectMessageDeletePopupComponent,
    DirectMessageDeleteDialogComponent,
    directMessageRoute,
    directMessagePopupRoute
} from './';

const ENTITY_STATES = [...directMessageRoute, ...directMessagePopupRoute];

@NgModule({
    imports: [SlackSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DirectMessageComponent,
        DirectMessageDetailComponent,
        DirectMessageUpdateComponent,
        DirectMessageDeleteDialogComponent,
        DirectMessageDeletePopupComponent
    ],
    entryComponents: [
        DirectMessageComponent,
        DirectMessageUpdateComponent,
        DirectMessageDeleteDialogComponent,
        DirectMessageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SlackDirectMessageModule {}
