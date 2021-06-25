import { Directive, ElementRef, EventEmitter, Input, NgModule, OnDestroy, Output } from '@angular/core';
import * as ace from 'brace';
import { Editor } from 'brace';

import 'brace';
import 'brace/ext/searchbox';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/yaml';
import 'brace/theme/chrome';
import 'brace/theme/tomorrow_night';


@Directive({
    selector: '[xmAceEditor]',
})
export class XmAceEditorDirective<O = unknown> implements OnDestroy {

    public _highlightActiveLine: boolean = true;
    public _showGutter: boolean = true;
    public editor: Editor;
    public oldText: string;
    @Output() public textChanged: EventEmitter<string> = new EventEmitter<string>();

    constructor(elementRef: ElementRef) {
        this.editor = ace.edit(elementRef.nativeElement);
        this.init();
        this.initEvents();
    }

    public _options: O;

    @Input()
    public set options(options: O) {
        this._options = options;
        this.editor.setOptions(options || {});
    }

    public _readOnly: boolean = false;

    @Input()
    public set readOnly(readOnly: boolean) {
        this._readOnly = readOnly;
        this.editor.setReadOnly(readOnly);
    }

    public _theme: string = 'chrome';

    @Input() set theme(theme: string) {
        this._theme = theme;
        this.editor.setTheme(`ace/theme/${theme}`);
    }

    public _mode: string = 'json';

    @Input() set mode(mode: string) {
        this._mode = mode;
        this.editor.getSession().setMode(`ace/mode/${mode}`);
    }

    public _autoUpdateContent: boolean = true;

    @Input() set autoUpdateContent(status: boolean) {
        this._autoUpdateContent = status;
    }

    @Input() set text(text: string) {
        if (!text) {
            text = '';
        }

        if (this._autoUpdateContent === true) {
            this.editor.setValue(text);
            this.editor.clearSelection();
            this.editor.focus();
            this.editor.moveCursorTo(0, 0);
        }
    }

    @Input() set gotoLine(line: number) {
        if (line) {
            this.editor.resize(true);
            this.editor.scrollToLine(line, true, true, () => undefined);
            this.editor.gotoLine(line, 0, true);
        }
    }

    public init(): void {
        this.editor.setOptions(this._options || {});
        this.editor.setTheme(`ace/theme/${this._theme}`);
        this.editor.getSession().setMode(`ace/mode/${this._mode}`);
        this.editor.setHighlightActiveLine(this._highlightActiveLine);
        this.editor.renderer.setShowGutter(this._showGutter);
        this.editor.setReadOnly(this._readOnly);
        this.editor.$blockScrolling = Infinity;
    }

    public initEvents(): void {
        this.editor.on('change', () => this.updateValue());
        this.editor.on('keypress', () => this.updateValue());
        this.editor.on('paste', () => this.updateValue());
    }

    public ngOnDestroy(): void {
        this.editor.destroy();
    }

    private updateValue(): void {
        const newVal = this.editor.getValue();
        if (newVal === this.oldText) {
            return;
        }
        if (typeof this.oldText !== 'undefined') {
            this.textChanged.emit(newVal);
        }
        this.oldText = newVal;
    }

}

@NgModule({
    exports: [XmAceEditorDirective],
    declarations: [XmAceEditorDirective],
})
export class AceEditorModule {
}
