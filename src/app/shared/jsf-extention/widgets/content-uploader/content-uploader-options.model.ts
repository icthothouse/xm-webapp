export interface ContentUploaderOptions {
    title?: string;
    required?: boolean;
    readonly?: boolean;
    noTitle?: boolean;
    placeholder?: string;
    maxFileSize?: number;
    validationMessages?: {required?: string; maxFileSize?: string};
}
