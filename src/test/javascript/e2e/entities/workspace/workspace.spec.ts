/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { WorkspaceComponentsPage, WorkspaceDeleteDialog, WorkspaceUpdatePage } from './workspace.page-object';

const expect = chai.expect;

describe('Workspace e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let workspaceUpdatePage: WorkspaceUpdatePage;
    let workspaceComponentsPage: WorkspaceComponentsPage;
    let workspaceDeleteDialog: WorkspaceDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Workspaces', async () => {
        await navBarPage.goToEntity('workspace');
        workspaceComponentsPage = new WorkspaceComponentsPage();
        expect(await workspaceComponentsPage.getTitle()).to.eq('slackApp.workspace.home.title');
    });

    it('should load create Workspace page', async () => {
        await workspaceComponentsPage.clickOnCreateButton();
        workspaceUpdatePage = new WorkspaceUpdatePage();
        expect(await workspaceUpdatePage.getPageTitle()).to.eq('slackApp.workspace.home.createOrEditLabel');
        await workspaceUpdatePage.cancel();
    });

    it('should create and save Workspaces', async () => {
        const nbButtonsBeforeCreate = await workspaceComponentsPage.countDeleteButtons();

        await workspaceComponentsPage.clickOnCreateButton();
        await promise.all([
            workspaceUpdatePage.setWorkspaceNameInput('workspaceName'),
            workspaceUpdatePage.setAdminInput('admin'),
            workspaceUpdatePage.setWorkspaceIDInput('5'),
            workspaceUpdatePage.setDescriptionInput('description'),
            workspaceUpdatePage.slackAppSelectLastOption()
        ]);
        expect(await workspaceUpdatePage.getWorkspaceNameInput()).to.eq('workspaceName');
        expect(await workspaceUpdatePage.getAdminInput()).to.eq('admin');
        expect(await workspaceUpdatePage.getWorkspaceIDInput()).to.eq('5');
        expect(await workspaceUpdatePage.getDescriptionInput()).to.eq('description');
        await workspaceUpdatePage.save();
        expect(await workspaceUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await workspaceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Workspace', async () => {
        const nbButtonsBeforeDelete = await workspaceComponentsPage.countDeleteButtons();
        await workspaceComponentsPage.clickOnLastDeleteButton();

        workspaceDeleteDialog = new WorkspaceDeleteDialog();
        expect(await workspaceDeleteDialog.getDialogTitle()).to.eq('slackApp.workspace.delete.question');
        await workspaceDeleteDialog.clickOnConfirmButton();

        expect(await workspaceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
