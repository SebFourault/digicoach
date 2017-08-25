import { Component, OnInit } from '@angular/core';

declare global {
    interface Window { $crisp: any; CRISP_WEBSITE_ID: any; }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit  {

    public paths;
    public selectedValue;

    constructor( ) { }

    ngOnInit() {
      this.launchCrisp();
    }

    launchCrisp() {
      window.$crisp=[];
      window.CRISP_WEBSITE_ID="0e02e462-13be-43f6-ba32-88df97c307d9";
      var d=document;
      var s=d.createElement("script");
      s.src="https://client.crisp.chat/l.js";
      s.async=true;
      d.getElementsByTagName("head")[0].appendChild(s);
    }

}
