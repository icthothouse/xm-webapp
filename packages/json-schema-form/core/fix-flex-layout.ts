import { MediaMarshaller } from '@angular/flex-layout';

export const fixFlexLayout = (): void => {
    const mediaMarshallerUpdateElement = MediaMarshaller.prototype.updateElement;

    MediaMarshaller.prototype.updateElement = function(element: HTMLElement, key: string, value: any): void {
        if (value === null || value === undefined) {
            if (key === 'layout-gap') {
                value = '0px';
            }
            if (key === 'layout-align') {
                value = '';
            }
        }
        mediaMarshallerUpdateElement.apply(this, [element, key, value]);
    };
};
