import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { JsonSchemaFormService } from '@xm-ngx/json-schema-form/core';
import { ContentUploaderLayoutNode } from './content-uploader.layoutNode';
import { ContentUploaderOptions } from './content-uploader-options.model';

@Component({
    selector: 'xm-ajfs-file-upload',
    templateUrl: 'content-uploader.component.html',
    styleUrls: ['./content-uploader.component.scss'],
})
export class ContentUploaderComponent implements OnInit, OnDestroy {

    public options: ContentUploaderOptions;
    public controlValue: any;
    public uploadingError: boolean = false;
    public uploadingSizeError: boolean = false;
    public progress: number;
    public file: any;
    public uploadProcess: any;

    @Input() public layoutNode: ContentUploaderLayoutNode;

    constructor(private jsf: JsonSchemaFormService) {
    }

    public ngOnInit(): void {
        this.options = this.layoutNode.options || {};
        this.jsf.initializeControl(this);
    }

    public ngOnDestroy(): void {
        if (this.uploadProcess) {
            this.uploadProcess.unsubscribe();
        }
    }

    public async updateFile(event: any): Promise<void> {
        const files = event.target.files;
        if (files.length > 0 && files[0].size <= this.options.maxFileSize) {
            this.uploadingSizeError = false;
            this.jsf.updateValue(this, await this.convertBase64(files[0]));
            this.file = files[0];
        } else if (files[0].size >= this.options.maxFileSize) {
            this.uploadingSizeError = true;
        }
    }

    public resetFile(): void {
        this.file = null;
        this.controlValue = null;
        this.progress = null;
        this.uploadingError = false;
        this.uploadingSizeError = false;
        this.jsf.updateValue(this, this.controlValue);
    }

    private convertBase64(file: any): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.toString());
            reader.onerror = error => reject(error);
        });
    }
}
