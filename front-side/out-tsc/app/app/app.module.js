import { __decorate } from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LoaderComponent } from './loader/loader.component';
import { AboutComponent } from './about/about.component';
const routes = [
    { path: "home", redirectTo: "", pathMatch: "full" },
    { path: "", component: HomeComponent },
    { path: "about", component: AboutComponent },
    { path: "**", redirectTo: "error404" },
    { path: "**", component: ErrorComponent }
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            HomeComponent,
            ErrorComponent,
            LoaderComponent,
            AboutComponent,
        ],
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            MatButtonModule,
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map