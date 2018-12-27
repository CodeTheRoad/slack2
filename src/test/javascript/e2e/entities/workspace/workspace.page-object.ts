import { element, by, ElementFinder } from 'protractor';

export class WorkspaceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-workspace div table .btn-danger'));
    title = element.all(by.css('jhi-workspace div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class WorkspaceUpdatePage {
    pageTitle = element(by.id('jhi-workspace-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    workspaceNameInput = element(by.id('field_workspaceName'));
    adminInput = element(by.id('field_admin'));
    workspaceIDInput = element(by.id('field_workspaceID'));
    descriptionInput = element(by.id('field_description'));
    slackAppSelect = element(by.id('field_slackApp'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setWorkspaceNameInput(workspaceName) {
        await this.workspaceNameInput.sendKeys(workspaceName);
    }

    async getWorkspaceNameInput() {
        return this.workspaceNameInput.getAttribute('value');
    }

    async setAdminInput(admin) {
        await this.adminInput.sendKeys(admin);
    }

    async getAdminInput() {
        return this.adminInput.getAttribute('value');
    }

    async setWorkspaceIDInput(workspaceID) {
        await this.workspaceIDInput.sendKeys(workspaceID);
    }

    async getWorkspaceIDInput() {
        return this.workspaceIDInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async slackAppSelectLastOption() {
        await this.slackAppSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async slackAppSelectOption(option) {
        await this.slackAppSelect.sendKeys(option);
    }

    getSlackAppSelect(): ElementFinder {
        return this.slackAppSelect;
    }

    async getSlackAppSelectedOption() {
        return this.slackAppSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class WorkspaceDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-workspace-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-workspace'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
