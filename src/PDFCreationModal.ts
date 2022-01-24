import { App, Modal } from "obsidian";

export class PDFCreationModal extends Modal {
	onCloseCallback: any;
	callToAction: string = "Create PDF";
	title: string = "Create a PDF"

	constructor(app: App, onCloseCallback: any) {
		super(app);
		this.onCloseCallback = onCloseCallback;
	}


	renderContents(contentEl: any) {
		const urlInput = contentEl.createEl('input');
		urlInput.id = "url-input";
		urlInput.innerText = "ENTER URL";
		urlInput.addClass('modal-input');

		const confirmButton = contentEl.createEl('button');
		confirmButton.innerText = this.callToAction;
		confirmButton.addClass('modal-submit-button');
		confirmButton.onClickEvent(async () => {
			const url = (<HTMLInputElement>document.getElementById("url-input")).value;
			await this.onCloseCallback(url);
			this.onClose();
			this.close();
		})
	}

	onOpen() {
		let {contentEl} = this;
		this.titleEl.setText(this.title);
		this.renderContents(contentEl);
	}

	onClose() {
		let {contentEl} = this;
		contentEl.empty();
	}
}