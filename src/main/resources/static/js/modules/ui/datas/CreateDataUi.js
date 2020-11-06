import {PdfViewer} from "../../utils/PdfViewer.js";

export class CreateDataUi {

    constructor(action, documentId, fields) {
        console.info("Starting data UI");
        if(documentId) {
            this.pdfViewer = new PdfViewer('/user/documents/getfile/' + documentId, true, 0);
            this.pdfViewer.setDataFields(fields);
            this.pdfViewer.scale = 0.70;
        }
        this.action = action;
        this.actionEnable = 0;
        this.initListeners();
    }


    initListeners() {
        if(this.pdfViewer) {
            this.pdfViewer.addEventListener('ready', e => this.startRender());
            this.pdfViewer.addEventListener('render', e => this.initChangeControl());
            this.pdfViewer.addEventListener('change', e => this.enableSave());
        }
        document.getElementById('saveButton').addEventListener('click', e => this.saveData(e));
        document.getElementById('saveForm').addEventListener('submit', e => this.saveData(e));
    }

    initChangeControl() {
        console.info("init change control")
        let inputs = $("#newData :input");
        $.each(inputs, (index, e) => this.listenForChange(e));
        if($("#sendModalButton").length) {
            let saveButton = $('#saveButton');
            saveButton.addClass('disabled');
        }
        if(this.action) {
            this.initFormAction();
        }
    }

    listenForChange(input) {
        $(input).change(e => this.enableSave());
    }

    enableSave() {
        let sendModalButton = $('#sendModalButton');
        sendModalButton.addClass('disabled');
        sendModalButton.removeAttr('data-target');
        let saveButton = $('#saveButton');
        saveButton.removeClass('disabled');
    }

    initFormAction() {
        if(this.actionEnable === 1) {
            console.info("eval : " + this.action);
            jQuery.globalEval(this.action);
            this.actionEnable = true
        }
        this.actionEnable++;
    }

    saveData(e) {
        e.preventDefault();
        console.info("check data name");
        let tempName = document.getElementById('tempName');
        if (tempName.checkValidity()) {
            console.info("submit form");
            document.getElementById('newDataSubmit').click();
        } else {
            tempName.focus();
            document.getElementById('tempName');
        }
    }

    startRender() {
        this.pdfViewer.renderPage(1);
        this.pdfViewer.adjustZoom();
    }

}