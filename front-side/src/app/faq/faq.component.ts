import { Component, OnInit } from '@angular/core';
import { Panel } from './panel';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.panels=[{
      name:"TERMİNLƏR LÜĞƏTİ",
      description:"<p><strong>Carrier</strong>– Bağlamaların daşınılmasını öz üzərinə götürən şirkət və ya fiziki şəxs;</p>\n" +
        "\n" +
        "<p><strong>Customer</strong>&nbsp;– «Camex» saytında qeydiyyatdan keçib və şirkətin xidmətlərindən istifadə edən hər hansı bir fiziki şəxs;</p>\n" +
        "\n" +
        "<p><strong>Shipping address</strong>&nbsp;– bağlamanın çatdırılma ünvanı;</p>\n" +
        "\n" +
        "<p><strong>Billing address</strong>&nbsp;– bank kartının qeydiyyatda olduğu ünvan;</p>\n" +
        "\n" +
        "<p><strong>Order number</strong>&nbsp;– sifariş nömrəsi;</p>\n" +
        "\n" +
        "<p><strong>Tracking number</strong>&nbsp;– bağlamanın izləmə nömrəsi;</p>\n" +
        "\n" +
        "<p><strong>Order confirmation</strong>&nbsp;– satıcı tərəfindən sifarişin təsdiq edilməsi haqqında məlumat;</p>\n" +
        "\n" +
        "<p><strong>Shipping confirmation</strong>&nbsp;– bağlamanın ünvana göndərilməsinin təstiq edilməsi haqqında məlumat.</p>"
    },{
      name:"TERMİNLƏR LÜĞƏTİ",
      description:"<p><strong>Carrier</strong>– Bağlamaların daşınılmasını öz üzərinə götürən şirkət və ya fiziki şəxs;</p>\n" +
        "\n" +
        "<p><strong>Customer</strong>&nbsp;– «Camex» saytında qeydiyyatdan keçib və şirkətin xidmətlərindən istifadə edən hər hansı bir fiziki şəxs;</p>\n" +
        "\n" +
        "<p><strong>Shipping address</strong>&nbsp;– bağlamanın çatdırılma ünvanı;</p>\n" +
        "\n" +
        "<p><strong>Billing address</strong>&nbsp;– bank kartının qeydiyyatda olduğu ünvan;</p>\n" +
        "\n" +
        "<p><strong>Order number</strong>&nbsp;– sifariş nömrəsi;</p>\n" +
        "\n" +
        "<p><strong>Tracking number</strong>&nbsp;– bağlamanın izləmə nömrəsi;</p>\n" +
        "\n" +
        "<p><strong>Order confirmation</strong>&nbsp;– satıcı tərəfindən sifarişin təsdiq edilməsi haqqında məlumat;</p>\n" +
        "\n" +
        "<p><strong>Shipping confirmation</strong>&nbsp;– bağlamanın ünvana göndərilməsinin təstiq edilməsi haqqında məlumat.</p>"
    },{
      name:"TERMİNLƏR LÜĞƏTİ",
      description:"<p><strong>Carrier</strong>– Bağlamaların daşınılmasını öz üzərinə götürən şirkət və ya fiziki şəxs;</p>\n" +
        "\n" +
        "<p><strong>Customer</strong>&nbsp;– «Camex» saytında qeydiyyatdan keçib və şirkətin xidmətlərindən istifadə edən hər hansı bir fiziki şəxs;</p>\n" +
        "\n" +
        "<p><strong>Shipping address</strong>&nbsp;– bağlamanın çatdırılma ünvanı;</p>\n" +
        "\n" +
        "<p><strong>Billing address</strong>&nbsp;– bank kartının qeydiyyatda olduğu ünvan;</p>\n" +
        "\n" +
        "<p><strong>Order number</strong>&nbsp;– sifariş nömrəsi;</p>\n" +
        "\n" +
        "<p><strong>Tracking number</strong>&nbsp;– bağlamanın izləmə nömrəsi;</p>\n" +
        "\n" +
        "<p><strong>Order confirmation</strong>&nbsp;– satıcı tərəfindən sifarişin təsdiq edilməsi haqqında məlumat;</p>\n" +
        "\n" +
        "<p><strong>Shipping confirmation</strong>&nbsp;– bağlamanın ünvana göndərilməsinin təstiq edilməsi haqqında məlumat.</p>"
    },{
      name:"TERMİNLƏR LÜĞƏTİ",
      description:"<p><strong>Carrier</strong>– Bağlamaların daşınılmasını öz üzərinə götürən şirkət və ya fiziki şəxs;</p>\n" +
        "\n" +
        "<p><strong>Customer</strong>&nbsp;– «Camex» saytında qeydiyyatdan keçib və şirkətin xidmətlərindən istifadə edən hər hansı bir fiziki şəxs;</p>\n" +
        "\n" +
        "<p><strong>Shipping address</strong>&nbsp;– bağlamanın çatdırılma ünvanı;</p>\n" +
        "\n" +
        "<p><strong>Billing address</strong>&nbsp;– bank kartının qeydiyyatda olduğu ünvan;</p>\n" +
        "\n" +
        "<p><strong>Order number</strong>&nbsp;– sifariş nömrəsi;</p>\n" +
        "\n" +
        "<p><strong>Tracking number</strong>&nbsp;– bağlamanın izləmə nömrəsi;</p>\n" +
        "\n" +
        "<p><strong>Order confirmation</strong>&nbsp;– satıcı tərəfindən sifarişin təsdiq edilməsi haqqında məlumat;</p>\n" +
        "\n" +
        "<p><strong>Shipping confirmation</strong>&nbsp;– bağlamanın ünvana göndərilməsinin təstiq edilməsi haqqında məlumat.</p>"
    }]
  }

  panels:Panel[]=[];
  name:string="FAQ"
  bannerSrc:string="../../assets/image/banners/faq-banner.png";
}
