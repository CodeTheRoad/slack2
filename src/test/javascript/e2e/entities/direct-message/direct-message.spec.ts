/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DirectMessageComponentsPage, DirectMessageDeleteDialog, DirectMessageUpdatePage } from './direct-message.page-object';

const expect = chai.expect;

describe('DirectMessage e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let directMessageUpdatePage: DirectMessageUpdatePage;
    let directMessageComponentsPage: DirectMessageComponentsPage;
    let directMessageDeleteDialog: DirectMessageDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load DirectMessages', async () => {
        await navBarPage.goToEntity('direct-message');
        directMessageComponentsPage = new DirectMessageComponentsPage();
        expect(await directMessageComponentsPage.getTitle()).to.eq('slackApp.directMessage.home.title');
    });

    it('should load create DirectMessage page', async () => {
        await directMessageComponentsPage.clickOnCreateButton();
        directMessageUpdatePage = new DirectMessageUpdatePage();
        expect(await directMessageUpdatePage.getPageTitle()).to.eq('slackApp.directMessage.home.createOrEditLabel');
        await directMessageUpdatePage.cancel();
    });

    it('should create and save DirectMessages', async () => {
        const nbButtonsBeforeCreate = await directMessageComponentsPage.countDeleteButtons();

        await directMessageComponentsPage.clickOnCreateButton();
        await promise.all([directMessageUpdatePage.setDmIdInput('5'), directMessageUpdatePage.setMessageInput('message')]);
        expect(await directMessageUpdatePage.getDmIdInput()).to.eq('5');
        expect(await directMessageUpdatePage.getMessageInput()).to.eq('message');
        await directMessageUpdatePage.save();
        expect(await directMessageUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await directMessageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last DirectMessage', async () => {
        const nbButtonsBeforeDelete = await directMessageComponentsPage.countDeleteButtons();
        await directMessageComponentsPage.clickOnLastDeleteButton();

        directMessageDeleteDialog = new DirectMessageDeleteDialog();
        expect(await directMessageDeleteDialog.getDialogTitle()).to.eq('slackApp.directMessage.delete.question');
        await directMessageDeleteDialog.clickOnConfirmButton();

        expect(await directMessageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
