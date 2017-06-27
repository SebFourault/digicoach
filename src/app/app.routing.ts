import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { DataService } from './services/data/data.service';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'chatbot',
    component: ChatbotComponent
  }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
