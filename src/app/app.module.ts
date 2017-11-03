import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent} from './components/home/home.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { DataService } from './services/data/data.service';
import { GoogleAnalyticsEventsService } from './services/google-analytics.service/google-analytics.service';

import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';


// Import routes
import { Routing } from './app.routing';

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { ToolmodalComponent } from './components/toolmodal/toolmodal.component';
import { OurstoryComponent } from './components/ourstory/ourstory.component';
import { ContactComponent } from './components/contact/contact.component';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatbotComponent,
    ToolboxComponent,
    SafePipe,
    ToolmodalComponent,
    OurstoryComponent,
    ContactComponent
  ],
  entryComponents: [ToolmodalComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [
    DataService,
    GoogleAnalyticsEventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
