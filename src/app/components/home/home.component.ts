import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import {Router, NavigationEnd} from "@angular/router";
import {GoogleAnalyticsEventsService} from '../../services/google-analytics-events.service/google-analytics-events.service';

import { ViewContainerRef } from '@angular/core';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

import { overlayConfigFactory } from "ngx-modialog";
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { ToolmodalComponent } from '../toolmodal/toolmodal.component';

import { trigger, state, style, animate, transition } from '@angular/animations';

declare var ga: Function;

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
  public tags;

  public learningPath;
  public idLearningPath;
  public paths;
  public selectedLearningPath;
  public headerState = "visible";
  public recoState = "hidden";
  public recoTools;
  public linkedContent;
  public finalLearningPath;

  constructor( private dataService : DataService, public modal: Modal, private route: ActivatedRoute, public googleAnalyticsEventsService: GoogleAnalyticsEventsService  ) { }

  ngOnInit() {
    /* IF PARAMETERS
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
    */


    this.dataService.getTable("LearningPaths").then( data => {
      this.paths = data;
      var randomGoal = Math.floor((Math.random() * data.records.length));
      this.selectedLearningPath = this.paths.records[randomGoal];
    });

    this.dataService.getTable("Tools").then( data => this.tools = data );
    this.dataService.getTable("Experts").then( data => this.experts = data );
    this.dataService.getTable("Linked Content").then( data => this.linkedContent = data );
    this.dataService.getTable("Tags").then( data => this.tags = data );
  }

  showLearningPath() {
    this.headerState = "hidden";
    this.recoState = "visible";
    this.recoTools = this.tools.records.filter(x => this.selectedLearningPath.fields['Tools'].includes(x.id) );
    this.finalLearningPath = this.selectedLearningPath;
  }

  openModal(tool) {
    //this.googleAnalyticsEventsService.emitEvent("testCategory", "testAction", "testLabel", 10);
    var experts = this.experts.records.filter(x => {
      return Array.isArray(x.fields['Tools']) ? x.fields['Tools'].includes(tool.id) : 0;
    });
    var linkedContent = this.linkedContent.records.filter(x => {
      return Array.isArray(x.fields['Tools Linked']) ? x.fields['Tools Linked'].includes(tool.id) : 0;
    });
    this.modal.open(ToolmodalComponent, overlayConfigFactory({ tool: tool, experts: experts, tags: this.tags, linkedContent: linkedContent }, BSModalContext));
  }

}
