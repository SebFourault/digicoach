import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ActivatedRoute, Params } from '@angular/router';

import { ViewContainerRef } from '@angular/core';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

import { overlayConfigFactory } from "ngx-modialog";
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { ToolmodalComponent } from '../toolmodal/toolmodal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tools;

  constructor( private dataService : DataService, public modal: Modal, private route: ActivatedRoute  ) { }

  ngOnInit() {
    this.dataService.getTable("Tools").then( data => this.tools = data );
  }

  openModal(tool) { 
    this.modal.open(ToolmodalComponent, overlayConfigFactory({ tool: tool }, BSModalContext));
  }

}
