import {MediaMatcher} from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {LoginService} from '../../Core/services/login/login.service';
import {MatSidenav} from '@angular/material/sidenav';
declare var $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class LayoutComponent implements OnInit,OnDestroy,AfterViewInit {

  mobileQuery: MediaQueryList;
  logoSrc:string="../../../assets/image/navbar/mob-menu-logo.png"
  @ViewChild('snav', {static: true}) public sidenav: MatSidenav;
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,public authService:LoginService,private _elementRef : ElementRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.sidenav.open()
    this._elementRef.nativeElement.querySelector('.mat-expansion-panel-content').currentStyle.style.height='0px';
  }
  logout() {
    this.authService.logout();
  }
  ngAfterViewInit(): void {
    this._elementRef.nativeElement.querySelector('.mat-expansion-panel-content').currentStyle.style.height='auto';
  }
}
