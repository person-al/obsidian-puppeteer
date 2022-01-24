import { FileSystemAdapter, Plugin } from "obsidian";
import { DEFAULT_SETTINGS } from "./const";
import { UrlToPDFSettings } from "./interfaces";
// import { SettingTab } from "./SettingTab";
import { jsPDF } from "jspdf";
import { PDFCreationModal } from "./PDFCreationModal";
import html2canvas from "html2canvas";

export default class UrlToPDF extends Plugin {
  settings: UrlToPDFSettings;

  async onload() {
    await this.loadSettings();
    // There are no settings to add just yet
    // this.addSettingTab(new SettingTab(this.app, this));
    this.addCommand({
			id: "url-to-pdf",
			name: "Url to PDF",
			callback: async () => new PDFCreationModal(this.app, this.createPDF).open(),
		});
  }

  onunload() {}

  rootAbsolutePath = (): string => {
    let adapter = this.app.vault.adapter;
    if (adapter instanceof FileSystemAdapter) {
        return adapter.getBasePath();
    }
    return '';
  }

  async createPDF(url: string) {
    //const doc = new jsPDF();
    const doc = new jsPDF({unit: "px"});
    fetch(url)
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        const iframe = document.createElement("iframe");
        iframe.height='100%'
        iframe.width='100%'
        document.body.appendChild(iframe); // 👈 still required
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(data);
        iframe.contentWindow.document.close();

        html2canvas(iframe.contentWindow.document.body, {
          width: 1200,
          height: 5000
        }).then(function(canvas) {
          document.body.appendChild(canvas);
          doc.addImage(canvas, 'JPEG',0,0,1200,5000);
          doc.save('MethodCanvas');
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // html2canvas(iframe.contentWindow.document.body, {
  //   scale:1
  // }).then(function(canvas) {
  //   document.body.appendChild(canvas);
  //   const properties = doc.getImageProperties(canvas);
  //   doc.addImage(canvas, 'JPEG',0,0,properties.width, properties.h);
  //   doc.save();
  // });
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
