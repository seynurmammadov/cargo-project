import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-title-admin',
  templateUrl: './title-admin.component.html',
  styleUrls: ['./title-admin.component.scss']
})
export class TitleAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() title:string;
}
