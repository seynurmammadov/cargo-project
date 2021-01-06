import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { fader } from '../Animations/animation';
let AppComponent = class AppComponent {
    constructor() {
        this.title = 'front-side';
    }
    prepareRoute(outlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss'],
        animations: [
            fader
        ]
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map