import { element, by, ElementFinder } from 'protractor';

export class ChannelComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-channel div table .btn-danger'));
    title = element.all(by.css('jhi-channel div h2#page-heading span')).first();

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

export class ChannelUpdatePage {
    pageTitle = element(by.id('jhi-channel-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    channelNameInput = element(by.id('field_channelName'));
    channelIDInput = element(by.id('field_channelID'));
    channelDescriptionInput = element(by.id('field_channelDescription'));
    isPrivateInput = element(by.id('field_isPrivate'));
    appUserSelect = element(by.id('field_appUser'));
    workspaceSelect = element(by.id('field_workspace'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setChannelNameInput(channelName) {
        await this.channelNameInput.sendKeys(channelName);
    }

    async getChannelNameInput() {
        return this.channelNameInput.getAttribute('value');
    }

    async setChannelIDInput(channelID) {
        await this.channelIDInput.sendKeys(channelID);
    }

    async getChannelIDInput() {
        return this.channelIDInput.getAttribute('value');
    }

    async setChannelDescriptionInput(channelDescription) {
        await this.channelDescriptionInput.sendKeys(channelDescription);
    }

    async getChannelDescriptionInput() {
        return this.channelDescriptionInput.getAttribute('value');
    }

    getIsPrivateInput() {
        return this.isPrivateInput;
    }

    async appUserSelectLastOption() {
        await this.appUserSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async appUserSelectOption(option) {
        await this.appUserSelect.sendKeys(option);
    }

    getAppUserSelect(): ElementFinder {
        return this.appUserSelect;
    }

    async getAppUserSelectedOption() {
        return this.appUserSelect.element(by.css('option:checked')).getText();
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

export class ChannelDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-channel-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-channel'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
