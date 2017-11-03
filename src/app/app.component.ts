import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {GoogleAnalyticsEventsService} from './services/google-analytics.service/google-analytics.service';"./google-analytics-events.service";

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

    constructor(public router: Router, public googleAnalyticsEventsService: GoogleAnalyticsEventsService) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          ga('set', 'page', event.urlAfterRedirects);
          ga('send', 'pageview');
        }
      });
    }

    ngOnInit() {
      this.launchCrisp();
    }

    // When page change, scroll to top
    onActivate(e, outlet){
      outlet.scrollTop = 0;
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

    submitEvent() {
      this.googleAnalyticsEventsService.emitEvent("testCategory", "testAction", "testLabel", 10);
    }

}
