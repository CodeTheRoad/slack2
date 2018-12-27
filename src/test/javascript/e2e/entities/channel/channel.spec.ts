/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ChannelComponentsPage, ChannelDeleteDialog, ChannelUpdatePage } from './channel.page-object';

const expect = chai.expect;

describe('Channel e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let channelUpdatePage: ChannelUpdatePage;
    let channelComponentsPage: ChannelComponentsPage;
    let channelDeleteDialog: ChannelDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Channels', async () => {
        await navBarPage.goToEntity('channel');
        channelComponentsPage = new ChannelComponentsPage();
        expect(await channelComponentsPage.getTitle()).to.eq('slackApp.channel.home.title');
    });

    it('should load create Channel page', async () => {
        await channelComponentsPage.clickOnCreateButton();
        channelUpdatePage = new ChannelUpdatePage();
        expect(await channelUpdatePage.getPageTitle()).to.eq('slackApp.channel.home.createOrEditLabel');
        await channelUpdatePage.cancel();
    });

    it('should create and save Channels', async () => {
        const nbButtonsBeforeCreate = await channelComponentsPage.countDeleteButtons();

        await channelComponentsPage.clickOnCreateButton();
        await promise.all([
            channelUpdatePage.setChannelNameInput('channelName'),
            channelUpdatePage.setChannelIDInput('5'),
            channelUpdatePage.setChannelDescriptionInput('channelDescription'),
            // channelUpdatePage.appUserSelectLastOption(),
            channelUpdatePage.workspaceSelectLastOption()
        ]);
        expect(await channelUpdatePage.getChannelNameInput()).to.eq('channelName');
        expect(await channelUpdatePage.getChannelIDInput()).to.eq('5');
        expect(await channelUpdatePage.getChannelDescriptionInput()).to.eq('channelDescription');
        const selectedIsPrivate = channelUpdatePage.getIsPrivateInput();
        if (await selectedIsPrivate.isSelected()) {
            await channelUpdatePage.getIsPrivateInput().click();
            expect(await channelUpdatePage.getIsPrivateInput().isSelected()).to.be.false;
        } else {
            await channelUpdatePage.getIsPrivateInput().click();
            expect(await channelUpdatePage.getIsPrivateInput().isSelected()).to.be.true;
        }
        await channelUpdatePage.save();
        expect(await channelUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await channelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Channel', async () => {
        const nbButtonsBeforeDelete = await channelComponentsPage.countDeleteButtons();
        await channelComponentsPage.clickOnLastDeleteButton();

        channelDeleteDialog = new ChannelDeleteDialog();
        expect(await channelDeleteDialog.getDialogTitle()).to.eq('slackApp.channel.delete.question');
        await channelDeleteDialog.clickOnConfirmButton();

        expect(await channelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
