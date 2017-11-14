import {Directive, AfterViewChecked} from '@angular/core';
declare var componentHandler: any;

@Directive({
    selector: '[mdl]'
})
export class MaterialDesignDirective implements AfterViewChecked {
    ngAfterViewChecked() {
        if (componentHandler) {
            componentHandler.upgradeAllRegistered();
        }
    }

}
