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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule,} from '@angular/material/datepicker';
import {MatToolbarModule,} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ServiceComponent } from './service/service.component';
import { TitleComponent } from './title/title.component';
import { RegisterComponent } from './register/register.component';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './login/login.component';
import { RestoreComponent } from './restore/restore.component';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import { NgApexchartsModule } from "ng-apexcharts";
import { MyprofileComponent } from './myprofile/myprofile.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { StatementDialogComponent } from './myprofile/dialogs/statement-dialog/statement-dialog.component';
import { ControlPanelComponent } from './myprofile/control-panel/control-panel.component';
import { CountriesComponent } from './myprofile/countries/countries.component';
import { StatementsComponent } from './myprofile/statements/statements.component';
import { OrdersComponent } from './myprofile/orders/orders.component';
import { OrderDialogComponent } from './myprofile/dialogs/order-dialog/order-dialog.component';
import {DashboardComponent} from './Admin/dashboard/dashboard.component';
import {LayoutComponent} from './Admin/layout/layout.component';
import { UsersComponent } from './Admin/users/users.component';
import { TitleAdminComponent } from './Admin/title-admin/title-admin.component';
import { RoleDialogComponent } from './Admin/dialogs/auth/role-dialog/role-dialog.component';
import { ResetDialogComponent } from './Admin/dialogs/auth/reset-dialog/reset-dialog.component';
import { InfoDialogComponent } from './Admin/dialogs/auth/info-dialog/info-dialog.component';
import { InfoBusinessDialogComponent } from './Admin/dialogs/auth/info-business-dialog/info-business-dialog.component';
import { CountriesAllComponent } from './Admin/countries-all/countries-all.component';
import { CountryEditDialogComponent } from './Admin/dialogs/country/country-edit-dialog/country-edit-dialog.component';
import { CountryCreateDialogComponent } from './Admin/dialogs/country/country-create-dialog/country-create-dialog.component';
import { CountryInfoComponent } from './Admin/countries-all/country-info/country-info.component';
import { CountryInfoCreateComponent } from './Admin/dialogs/country/country-info-create/country-info-create.component';
import { CountryInfoEditComponent } from './Admin/dialogs/country/country-info-edit/country-info-edit.component';
import { OfficesComponent } from './Admin/offices/offices.component';
import {AuthOutGuard} from './Core/guards/auth-out.guard';
import {AuthGuard} from './Core/guards/auth.guard';
import {CoreModule} from './Core/core.module';
import {LanguagesService} from './Core/services/lang/languages.service';
import {GlobalService} from './Core/services/global/global.service';
import { CreateOfficeComponent } from './Admin/dialogs/office/create-office/create-office.component';
import { UpdateOfficeComponent } from './Admin/dialogs/office/update-office/update-office.component';

const routes: Routes=[
  { path: "home", redirectTo:"" ,pathMatch:"full"},
  { path:"",  component:HomeComponent },
  { path:"about",  component:AboutComponent, data: {animation: 'About'}},
  { path:"shopping",  component:ShopingComponent, data: {animation: 'Shopping'} },
  { path:"tariffs",  component:TariffsComponent, data: {animation: 'Tariffs'} },
  { path:"calculator",  component:CalculatorComponent, data: {animation: 'Calculator'} },
  { path:"courier",  component:CourierComponent, data: {animation: 'Courier'} },
  { path:"news",  component:NewsComponent, data: {animation: 'News'} },
  { path:"faq",  component:FaqComponent, data: {animation: 'Faq'} },
  { path:"contact",  component:ContactComponent, data: {animation: 'Contact'} },
  { path:"services",  component:ServiceComponent, data: {animation: 'Services'} },
  { path:"register",  component:RegisterComponent, data: {animation: 'Register'}, canActivate: [AuthOutGuard] },
  { path:"login",  component:LoginComponent, data: {animation: 'Login'},canActivate: [AuthOutGuard]},
  { path:"restore",  component:RestoreComponent, data: {animation: 'Restore'}, canActivate: [AuthOutGuard] },
  { path:"myprofile/statements", redirectTo:"myprofile" },
  { path:"myprofile/control-panel", redirectTo:"myprofile" },
  { path:"myprofile/countries", redirectTo:"myprofile" },
  { path:"myprofile/orders", redirectTo:"myprofile" },
  { path:"myprofile",  component:MyprofileComponent, data: {animation: 'Myprofile'}, canActivate: [AuthGuard] },
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {animation: 'admin'},
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {animation: 'dashboard'},
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {animation: 'users'},
      },
      {
        path: 'countries',
        component: CountriesAllComponent,
        data: {animation: 'countries'},
      },
      {
        path: 'countries/:id',
        component: CountryInfoComponent,
        data: {animation: 'countriesId'},
      },
      {
        path: 'offices',
        component: OfficesComponent,
        data: {animation: 'countries'},
      },
      {
        path: '**',
        component: ErrorComponent,
        data: {animation: 'errorr'},
      },
    ],
  },
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
    LoginComponent,
    RestoreComponent,
    MyprofileComponent,
    StatementDialogComponent,
    ControlPanelComponent,
    CountriesComponent,
    StatementsComponent,
    OrdersComponent,
    OrderDialogComponent,
    LayoutComponent,
    DashboardComponent,
    LayoutComponent,
    UsersComponent,
    TitleAdminComponent,
    RoleDialogComponent,
    ResetDialogComponent,
    InfoDialogComponent,
    InfoBusinessDialogComponent,
    CountriesAllComponent,
    CountryEditDialogComponent,
    CountryCreateDialogComponent,
    CountryInfoComponent,
    CountryInfoCreateComponent,
    CountryInfoEditComponent,
    OfficesComponent,
    CreateOfficeComponent,
    UpdateOfficeComponent,
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
    CoreModule,
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
    MatNativeDateModule,
    MatCheckboxModule,
    RxReactiveFormsModule,
    NgApexchartsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    MatToolbarModule,
    MatListModule,
    MatAutocompleteModule,
    MatChipsModule
  ],
  exports: [
    RouterModule,
    LayoutComponent,
  ],
  providers: [
    LanguagesService,
    GlobalService,
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
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatToolbarModule,
    MatListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
