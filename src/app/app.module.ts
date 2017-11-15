import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialDesignDirective } from './directives/material-design.directive/material-design.directive';

import { AppComponent } from './app.component';
import { HomeComponent} from './components/home/home.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { DataService } from './services/data/data.service';
import { ToolsService } from "app/services/tools/tools.service";
import { GoogleAnalyticsEventsService } from './services/google-analytics-events.service/google-analytics-events.service';
import { FilterComponent } from './components/filter.component/filter.component';

import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import {ScrollToModule} from 'ng2-scroll-to';


// Import routes
import { Routing } from './app.routing';

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { ToolmodalComponent } from './components/toolmodal/toolmodal.component';
import { OurstoryComponent } from './components/ourstory/ourstory.component';
import { ContactComponent } from './components/contact/contact.component';

// Pipes
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
import { HavingPipe } from "app/pipes/having/having.pipe";

@NgModule({
  declarations: [
    AppComponent,
    MaterialDesignDirective,
    HomeComponent,
    ChatbotComponent,
    ToolboxComponent,
    SafePipe,
    ToolmodalComponent,
    OurstoryComponent,
    ContactComponent,
    FilterComponent,
    HavingPipe
  ],
  entryComponents: [ToolmodalComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    ScrollToModule.forRoot()
  ],
  providers: [
    DataService,
    ToolsService,
    GoogleAnalyticsEventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
