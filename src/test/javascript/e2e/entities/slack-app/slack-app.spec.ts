/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SlackAppComponentsPage, SlackAppDeleteDialog, SlackAppUpdatePage } from './slack-app.page-object';

const expect = chai.expect;

describe('SlackApp e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let slackAppUpdatePage: SlackAppUpdatePage;
    let slackAppComponentsPage: SlackAppComponentsPage;
    let slackAppDeleteDialog: SlackAppDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SlackApps', async () => {
        await navBarPage.goToEntity('slack-app');
        slackAppComponentsPage = new SlackAppComponentsPage();
        expect(await slackAppComponentsPage.getTitle()).to.eq('slackApp.slackApp.home.title');
    });

    it('should load create SlackApp page', async () => {
        await slackAppComponentsPage.clickOnCreateButton();
        slackAppUpdatePage = new SlackAppUpdatePage();
        expect(await slackAppUpdatePage.getPageTitle()).to.eq('slackApp.slackApp.home.createOrEditLabel');
        await slackAppUpdatePage.cancel();
    });

    it('should create and save SlackApps', async () => {
        const nbButtonsBeforeCreate = await slackAppComponentsPage.countDeleteButtons();

        await slackAppComponentsPage.clickOnCreateButton();
        await promise.all([]);
        await slackAppUpdatePage.save();
        expect(await slackAppUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await slackAppComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last SlackApp', async () => {
        const nbButtonsBeforeDelete = await slackAppComponentsPage.countDeleteButtons();
        await slackAppComponentsPage.clickOnLastDeleteButton();

        slackAppDeleteDialog = new SlackAppDeleteDialog();
        expect(await slackAppDeleteDialog.getDialogTitle()).to.eq('slackApp.slackApp.delete.question');
        await slackAppDeleteDialog.clickOnConfirmButton();

        expect(await slackAppComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
