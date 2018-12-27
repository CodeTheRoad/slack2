import { element, by, ElementFinder } from 'protractor';

export class DirectMessageComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-direct-message div table .btn-danger'));
    title = element.all(by.css('jhi-direct-message div h2#page-heading span')).first();

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

export class DirectMessageUpdatePage {
    pageTitle = element(by.id('jhi-direct-message-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dmIdInput = element(by.id('field_dmId'));
    messageInput = element(by.id('field_message'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDmIdInput(dmId) {
        await this.dmIdInput.sendKeys(dmId);
    }

    async getDmIdInput() {
        return this.dmIdInput.getAttribute('value');
    }

    async setMessageInput(message) {
        await this.messageInput.sendKeys(message);
    }

    async getMessageInput() {
        return this.messageInput.getAttribute('value');
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

export class DirectMessageDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-directMessage-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-directMessage'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
