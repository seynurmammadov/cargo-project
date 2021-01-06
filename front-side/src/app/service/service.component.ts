import { Component, OnInit } from '@angular/core';
import {ServiceItem} from './service-item';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.services=[{
      title:"AIR SHIPPING FROM THE UNITED STATES,GERMANY,CHINA AND DUBAI",
      description:"Camex offers international shipping of small and heavyweight cargo from the United States,Germany,China and Dubai to Georgia. Company supports the local customers to shop online worldwide and provides the quickest, cheapest and safest delivery of cargo. 15 year of expert knowledge in freight forwarding, offices in the United States, Europe and Asia and dedicated professionals ensure the high service quality, consistency and execution. Any individual or business customer having registered on our website may enjoy our services. Registration is free.",
      iconSrc:"../../assets/image/icons/air-icon-png.png"
    },{
      title:"AIR SHIPPING FROM THE UNITED STATES,GERMANY,CHINA AND DUBAI",
      description:"Camex offers international shipping of small and heavyweight cargo from the United States,Germany,China and Dubai to Georgia. Company supports the local customers to shop online worldwide and provides the quickest, cheapest and safest delivery of cargo. 15 year of expert knowledge in freight forwarding, offices in the United States, Europe and Asia and dedicated professionals ensure the high service quality, consistency and execution. Any individual or business customer having registered on our website may enjoy our services. Registration is free.",
      iconSrc:"../../assets/image/icons/air-icon-png.png"
    },{
      title:"AIR SHIPPING FROM THE UNITED STATES,GERMANY,CHINA AND DUBAI",
      description:"Camex offers international shipping of small and heavyweight cargo from the United States,Germany,China and Dubai to Georgia. Company supports the local customers to shop online worldwide and provides the quickest, cheapest and safest delivery of cargo. 15 year of expert knowledge in freight forwarding, offices in the United States, Europe and Asia and dedicated professionals ensure the high service quality, consistency and execution. Any individual or business customer having registered on our website may enjoy our services. Registration is free.",
      iconSrc:"../../assets/image/icons/air-icon-png.png"
    },{
      title:"AIR SHIPPING FROM THE UNITED STATES,GERMANY,CHINA AND DUBAI",
      description:"Camex offers international shipping of small and heavyweight cargo from the United States,Germany,China and Dubai to Georgia. Company supports the local customers to shop online worldwide and provides the quickest, cheapest and safest delivery of cargo. 15 year of expert knowledge in freight forwarding, offices in the United States, Europe and Asia and dedicated professionals ensure the high service quality, consistency and execution. Any individual or business customer having registered on our website may enjoy our services. Registration is free.",
      iconSrc:"../../assets/image/icons/air-icon-png.png"
    }]
  }
  services:ServiceItem[]=[]
  name:string="Service"
  bannerSrc:string="../../assets/image/banners/service-banner.jpg";
}
