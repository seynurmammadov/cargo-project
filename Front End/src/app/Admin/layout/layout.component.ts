import {BreakpointObserver, BreakpointState, MediaMatcher} from '@angular/cdk/layout';
import {
  AfterContentChecked, AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {LoginService} from '../../Core/services/login/login.service';
import {MatSidenav} from '@angular/material/sidenav';
import {MatDialog} from '@angular/material/dialog';
import {AddToAnbarNewParcelComponent} from '../dialogs/add-to-anbar-new-parcel/add-to-anbar-new-parcel.component';
import {NavigationService} from '../../Core/services/navigation/navigation.service';
import {UserNavVM} from '../../navbar/models/UserNavVM';
declare let alertify: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class LayoutComponent implements OnInit,OnDestroy,AfterViewInit {
  userNav:UserNavVM;
  mobileQuery: MediaQueryList;
  showContainer: boolean;
  logoSrc:string="../../../assets/image/navbar/mob-menu-logo.png"
  @ViewChild('snav', {static: true})
  public sidenav: MatSidenav;
  @ViewChild('snav') drawer: any
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              public authService:LoginService,
              private _elementRef : ElementRef,
              private navigation:NavigationService,
              public dialog: MatDialog,public breakpointObserver: BreakpointObserver) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');

    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngAfterViewInit(): void {
 setTimeout(()=>{
   var element = document.getElementById("active");
   element.classList.remove("active");
   var element2 = document.getElementById("active2");
   element2.classList.remove("active");
   var element3 = document.getElementById("active3");
   element3.classList.remove("active");
   var element4 = document.getElementById("active4");
   element4.classList.remove("active");
     },1000)
    }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getUser()
    this.breakpointObserver
      .observe(['(max-width: 1000px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.sidenav.close();
        } else {
          this.sidenav.open();
        }
      });
  }
  logout() {
    this.authService.logout();
  }


  open(){
    const dialogRefCreate = this.dialog.open(AddToAnbarNewParcelComponent, {
      width: '1050px',
      data: null
    });

  }
  loaded:boolean=false
  getUser(){
    this.authService.user$.subscribe(user=> {
      if (user != null && this.authService.end) {
        this.navigation.getUser().subscribe(res=>{
          this.userNav=res;
          this.loaded=true
        })
      }
    })
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44387/Site/images/users/${serverPath}`;
  }
}
