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


// Import routes
import { Routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatbotComponent,
    ToolboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing,
    BrowserAnimationsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
