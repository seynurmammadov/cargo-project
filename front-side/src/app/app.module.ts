import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import {Routes,RouterModule} from '@angular/router'
import { LoaderComponent } from './loader/loader.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MobileNavbarComponent } from './mobile-navbar/mobile-navbar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule,} from '@angular/material/datepicker';
import { LanguagesService } from './services/languages.service';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { ShopingComponent } from './shoping/shoping.component';
import { TariffsComponent } from './tariffs/tariffs.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CourierComponent } from './courier/courier.component';
import { NewsComponent } from './news/news.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ServiceComponent } from './service/service.component';
import { TitleComponent } from './title/title.component';
import { RegisterComponent } from './register/register.component';
import { MatNativeDateModule } from '@angular/material/core';
const routes: Routes=[
  { path: "home", redirectTo:"" ,pathMatch:"full"},
  { path:"",  component:HomeComponent },
  { path:"about",  component:AboutComponent, data: {animation: 'About'} },
  { path:"shopping",  component:ShopingComponent, data: {animation: 'Shopping'} },
  { path:"tariffs",  component:TariffsComponent, data: {animation: 'Tariffs'} },
  { path:"calculator",  component:CalculatorComponent, data: {animation: 'Calculator'} },
  { path:"courier",  component:CourierComponent, data: {animation: 'Courier'} },
  { path:"news",  component:NewsComponent, data: {animation: 'News'} },
  { path:"faq",  component:FaqComponent, data: {animation: 'Faq'} },
  { path:"contact",  component:ContactComponent, data: {animation: 'Contact'} },
  { path:"services",  component:ServiceComponent, data: {animation: 'Services'} },
  { path:"register",  component:RegisterComponent, data: {animation: 'Register'} },
  { path:"**", redirectTo:"error404",data: {animation: 'Error'}},
  { path:"**", component:ErrorComponent,data: {animation: 'Error'}}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    LoaderComponent,
    AboutComponent,
    NavbarComponent,
    MobileNavbarComponent,
    FooterComponent,
    BannerComponent,
    ShopingComponent,
    TariffsComponent,
    CalculatorComponent,
    CourierComponent,
    NewsComponent,
    FaqComponent,
    ContactComponent,
    ServiceComponent,
    TitleComponent,
    RegisterComponent,

  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        MatFormFieldModule,
        MatSelectModule,
        HttpClientModule,
        MatButtonModule,
        CarouselModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        }),
        MatSidenavModule,
        MatRadioModule,
        MatInputModule,
        MatTabsModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
  exports:[
    RouterModule,

  ],
  providers: [
    LanguagesService,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatRadioModule,
    MatInputModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
