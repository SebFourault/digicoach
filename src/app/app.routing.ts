import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { DataService } from './services/data/data.service';
import { OurstoryComponent } from './components/ourstory/ourstory.component';
import { ContactComponent } from './components/contact/contact.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'chatbot',
    component: ChatbotComponent
  },
  {
    path: 'our-story',
    component: OurstoryComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
