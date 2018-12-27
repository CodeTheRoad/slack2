/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AppUserComponentsPage, AppUserDeleteDialog, AppUserUpdatePage } from './app-user.page-object';

const expect = chai.expect;

describe('AppUser e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let appUserUpdatePage: AppUserUpdatePage;
    let appUserComponentsPage: AppUserComponentsPage;
    let appUserDeleteDialog: AppUserDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load AppUsers', async () => {
        await navBarPage.goToEntity('app-user');
        appUserComponentsPage = new AppUserComponentsPage();
        expect(await appUserComponentsPage.getTitle()).to.eq('slackApp.appUser.home.title');
    });

    it('should load create AppUser page', async () => {
        await appUserComponentsPage.clickOnCreateButton();
        appUserUpdatePage = new AppUserUpdatePage();
        expect(await appUserUpdatePage.getPageTitle()).to.eq('slackApp.appUser.home.createOrEditLabel');
        await appUserUpdatePage.cancel();
    });

    it('should create and save AppUsers', async () => {
        const nbButtonsBeforeCreate = await appUserComponentsPage.countDeleteButtons();

        await appUserComponentsPage.clickOnCreateButton();
        await promise.all([
            appUserUpdatePage.setUserIdInput('5'),
            appUserUpdatePage.setDisplayNameInput('displayName'),
            appUserUpdatePage.setEmailInput('email'),
            appUserUpdatePage.setUserNameInput('userName'),
            appUserUpdatePage.setPasswordInput('password'),
            appUserUpdatePage.messageSelectLastOption(),
            // appUserUpdatePage.workspaceSelectLastOption(),
            // appUserUpdatePage.directMessageSelectLastOption(),
            appUserUpdatePage.slackAppSelectLastOption()
        ]);
        expect(await appUserUpdatePage.getUserIdInput()).to.eq('5');
        expect(await appUserUpdatePage.getDisplayNameInput()).to.eq('displayName');
        expect(await appUserUpdatePage.getEmailInput()).to.eq('email');
        expect(await appUserUpdatePage.getUserNameInput()).to.eq('userName');
        expect(await appUserUpdatePage.getPasswordInput()).to.eq('password');
        const selectedIsActive = appUserUpdatePage.getIsActiveInput();
        if (await selectedIsActive.isSelected()) {
            await appUserUpdatePage.getIsActiveInput().click();
            expect(await appUserUpdatePage.getIsActiveInput().isSelected()).to.be.false;
        } else {
            await appUserUpdatePage.getIsActiveInput().click();
            expect(await appUserUpdatePage.getIsActiveInput().isSelected()).to.be.true;
        }
        await appUserUpdatePage.save();
        expect(await appUserUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await appUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last AppUser', async () => {
        const nbButtonsBeforeDelete = await appUserComponentsPage.countDeleteButtons();
        await appUserComponentsPage.clickOnLastDeleteButton();

        appUserDeleteDialog = new AppUserDeleteDialog();
        expect(await appUserDeleteDialog.getDialogTitle()).to.eq('slackApp.appUser.delete.question');
        await appUserDeleteDialog.clickOnConfirmButton();

        expect(await appUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
