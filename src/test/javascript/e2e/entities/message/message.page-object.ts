import { element, by, ElementFinder } from 'protractor';

export class MessageComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-message div table .btn-danger'));
    title = element.all(by.css('jhi-message div h2#page-heading span')).first();

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

export class MessageUpdatePage {
    pageTitle = element(by.id('jhi-message-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    messageIdInput = element(by.id('field_messageId'));
    messageInput = element(by.id('field_message'));
    timeStampInput = element(by.id('field_timeStamp'));
    dateStampInput = element(by.id('field_dateStamp'));
    senderInput = element(by.id('field_sender'));
    channelSelect = element(by.id('field_channel'));
    directMessageSelect = element(by.id('field_directMessage'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setMessageIdInput(messageId) {
        await this.messageIdInput.sendKeys(messageId);
    }

    async getMessageIdInput() {
        return this.messageIdInput.getAttribute('value');
    }

    async setMessageInput(message) {
        await this.messageInput.sendKeys(message);
    }

    async getMessageInput() {
        return this.messageInput.getAttribute('value');
    }

    async setTimeStampInput(timeStamp) {
        await this.timeStampInput.sendKeys(timeStamp);
    }

    async getTimeStampInput() {
        return this.timeStampInput.getAttribute('value');
    }

    async setDateStampInput(dateStamp) {
        await this.dateStampInput.sendKeys(dateStamp);
    }

    async getDateStampInput() {
        return this.dateStampInput.getAttribute('value');
    }

    async setSenderInput(sender) {
        await this.senderInput.sendKeys(sender);
    }

    async getSenderInput() {
        return this.senderInput.getAttribute('value');
    }

    async channelSelectLastOption() {
        await this.channelSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async channelSelectOption(option) {
        await this.channelSelect.sendKeys(option);
    }

    getChannelSelect(): ElementFinder {
        return this.channelSelect;
    }

    async getChannelSelectedOption() {
        return this.channelSelect.element(by.css('option:checked')).getText();
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

export class MessageDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-message-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-message'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
