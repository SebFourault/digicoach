import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router, NavigationEnd } from "@angular/router";
import { ToolsService } from "app/services/tools/tools.service";
import {GoogleAnalyticsEventsService} from '../../services/google-analytics-events.service/google-analytics-events.service';
import { ToolCriterias } from 'app/shared/toolcriterias.model';

import { ViewContainerRef } from '@angular/core';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

import { overlayConfigFactory } from "ngx-modialog";
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { ToolmodalComponent } from '../toolmodal/toolmodal.component';

import { trigger, state, style, animate, transition } from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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
  public tools: any[];
  private allTools: any[];
  public experts;
  public tags;
  public ready: Boolean;
  public learningPath;
  public idLearningPath;
  public paths;
  public selectedLearningPath;
  public headerState = "visible";
  public recoState = "hidden";
  public recoTools;
  public linkedContent;
  public finalLearningPath;

  constructor( private dataService : DataService, private _toolsService: ToolsService, public modal: Modal, private route: ActivatedRoute, public googleAnalyticsEventsService: GoogleAnalyticsEventsService  ) { }

  ngOnInit(): void {
    this.ready = false;
    // Using promises to fetch tables values
    Promise.all([
            this.dataService.getTable('LearningPaths'),
            this.dataService.getTable('Experts'),
            this.dataService.getTable('Linked Content'),
            this.dataService.getTable('Tags')
        ]).then(results => {
            this.paths = results[0];
            this.experts = results[1];
            this.linkedContent = results[2];
            this.tags = results[3];
            var randomGoal = Math.floor((Math.random() * this.paths.records.length));
            this.selectedLearningPath = this.paths.records[randomGoal];
        }).catch(err => {
            console.error(err);
        });
    // Using Observable to fetch values from Tools table
    this._toolsService
            .list()
            .subscribe(
              (tools: any[]) => {
                this.tools = this.allTools = tools;
                this.ready = true;
              },
             (error: any) => {
                 console.error(error);
             });
  }

  showLearningPath() {
    this.headerState = "hidden";
    this.recoState = "visible";
    this.recoTools = this.tools['records'].filter(x => this.selectedLearningPath.fields['Tools'].includes(x.id) );
    this.finalLearningPath = this.selectedLearningPath;
  }

  openModal(tool) {
    this.googleAnalyticsEventsService.emitEvent("ToolCard", "open", tool.fields['Tool'], 1);
    var experts = this.experts.records.filter(x => {
      return Array.isArray(x.fields['Tools']) ? x.fields['Tools'].includes(tool.id) : 0;
    });
    var linkedContent = this.linkedContent.records.filter(x => {
      return Array.isArray(x.fields['Tools Linked']) ? x.fields['Tools Linked'].includes(tool.id) : 0;
    });
    this.modal.open(ToolmodalComponent, overlayConfigFactory({ tool: tool, experts: experts, tags: this.tags, linkedContent: linkedContent }, BSModalContext));
  }

  /**
  * Appelé lorsque les criteres de filtre ont été modifiés
  * @param criterias Les nouveaux critères de filtre
  */
  public onCriteriasChanged(criterias: ToolCriterias): void {
      if (this.allTools)
        this.tools['records'] = this.allTools['records'].slice();
  }

}
