import { element, by, ElementFinder } from 'protractor';

export class AppUserComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-app-user div table .btn-danger'));
    title = element.all(by.css('jhi-app-user div h2#page-heading span')).first();

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

export class AppUserUpdatePage {
    pageTitle = element(by.id('jhi-app-user-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    userIdInput = element(by.id('field_userId'));
    displayNameInput = element(by.id('field_displayName'));
    emailInput = element(by.id('field_email'));
    userNameInput = element(by.id('field_userName'));
    passwordInput = element(by.id('field_password'));
    isActiveInput = element(by.id('field_isActive'));
    messageSelect = element(by.id('field_message'));
    workspaceSelect = element(by.id('field_workspace'));
    directMessageSelect = element(by.id('field_directMessage'));
    slackAppSelect = element(by.id('field_slackApp'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setUserIdInput(userId) {
        await this.userIdInput.sendKeys(userId);
    }

    async getUserIdInput() {
        return this.userIdInput.getAttribute('value');
    }

    async setDisplayNameInput(displayName) {
        await this.displayNameInput.sendKeys(displayName);
    }

    async getDisplayNameInput() {
        return this.displayNameInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setUserNameInput(userName) {
        await this.userNameInput.sendKeys(userName);
    }

    async getUserNameInput() {
        return this.userNameInput.getAttribute('value');
    }

    async setPasswordInput(password) {
        await this.passwordInput.sendKeys(password);
    }

    async getPasswordInput() {
        return this.passwordInput.getAttribute('value');
    }

    getIsActiveInput() {
        return this.isActiveInput;
    }

    async messageSelectLastOption() {
        await this.messageSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async messageSelectOption(option) {
        await this.messageSelect.sendKeys(option);
    }

    getMessageSelect(): ElementFinder {
        return this.messageSelect;
    }

    async getMessageSelectedOption() {
        return this.messageSelect.element(by.css('option:checked')).getText();
    }

    async workspaceSelectLastOption() {
        await this.workspaceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async workspaceSelectOption(option) {
        await this.workspaceSelect.sendKeys(option);
    }

    getWorkspaceSelect(): ElementFinder {
        return this.workspaceSelect;
    }

    async getWorkspaceSelectedOption() {
        return this.workspaceSelect.element(by.css('option:checked')).getText();
    }

    async directMessageSelectLastOption() {
        await this.directMessageSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async directMessageSelectOption(option) {
        await this.directMessageSelect.sendKeys(option);
    }

    getDirectMessageSelect(): ElementFinder {
        return this.directMessageSelect;
    }

    async getDirectMessageSelectedOption() {
        return this.directMessageSelect.element(by.css('option:checked')).getText();
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

export class AppUserDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-appUser-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-appUser'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
