import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ActivatedRoute, Params } from '@angular/router';

import { ViewContainerRef } from '@angular/core';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

import { overlayConfigFactory } from "ngx-modialog";
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { ToolmodalComponent } from '../toolmodal/toolmodal.component';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
      trigger('slideUp', [
        state('hidden', style({
          height: '0',
          opacity: 0
        })),
        state('visible',   style({
          height: '*',
          opacity: 1
        })),
        transition('hidden => visible', animate('300ms ease-in')),
        transition('visible => hidden', animate('500ms ease-in-out'))
      ])
    ]
})
export class HomeComponent implements OnInit {

  public tools;
  public experts;
  public learningPath;
  public idLearningPath;
  public paths;
  public selectedLearningPath;
  public headerState = "visible";
  public recoState = "hidden";
  public recoTools;

  constructor( private dataService : DataService, public modal: Modal, private route: ActivatedRoute  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idLearningPath = +params['id'];
      console.log(this.idLearningPath);

      if(this.idLearningPath) {
        this.dataService.getTable("LearningPaths").then( data => this.learningPath = data.filter(x => x.id === this.idLearningPath) );
        console.log(this.learningPath);
      } else {
        this.dataService.getTable("LearningPaths").then( data => this.learningPath = data );
      }

    });


    this.dataService.getTable("LearningPaths").then( data => {
      this.paths = data; 
      var randomGoal = Math.floor((Math.random() * data.records.length));
      this.selectedLearningPath = this.paths.records[randomGoal];
    });

    this.dataService.getTable("Tools").then( data => this.tools = data );
    this.dataService.getTable("Experts").then( data => this.experts = data );
  }

  showLearningPath() {
    this.headerState = "hidden";
    this.recoState = "visible";
    this.recoTools = this.tools.records.filter(x => this.selectedLearningPath.fields['Tools'].includes(x.id) );
    console.log(this.recoTools);
  }

  openModal(tool) {
    this.modal.open(ToolmodalComponent, overlayConfigFactory({ tool: tool }, BSModalContext));
  }

}
