import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SlackSlackAppModule } from './slack-app/slack-app.module';
import { SlackChannelModule } from './channel/channel.module';
import { SlackWorkspaceModule } from './workspace/workspace.module';
import { SlackAppUserModule } from './app-user/app-user.module';
import { SlackMessageModule } from './message/message.module';
import { SlackDirectMessageModule } from './direct-message/direct-message.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SlackSlackAppModule,
        SlackChannelModule,
        SlackWorkspaceModule,
        SlackAppUserModule,
        SlackMessageModule,
        SlackDirectMessageModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SlackEntityModule {}
