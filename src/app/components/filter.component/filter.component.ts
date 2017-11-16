import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from '../../services/data/data.service';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/onerrorresumenext';

import { ToolCriterias } from '../../shared/toolcriterias.model';

@Component({
    selector: 'filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    public filters: any[] = [];
    public ready: boolean = false;
    public allSelected: boolean = true;

    @Input()
    public criterias: ToolCriterias = new ToolCriterias();

    @Output()
    public change: EventEmitter<ToolCriterias> = new EventEmitter<ToolCriterias>();

    constructor(
        private dataService: DataService
    ) { }

    public ngOnInit() {
        //this.dataService.getTable("Tools").then( data => this.tools = data );
        Observable.onErrorResumeNext(
            Observable.forkJoin([
                this.dataService.observeTable("Tools"),
                this.dataService.observeTable("Experts"),
                this.dataService.observeTable("Tags")
            ])
        ).subscribe(results => {
            let Usage: string[] = [];
            let Difficulty: string[] = [];
            let TimeToMaster: string[] = [];
            let DataPrivacyCompliance: string[] = [];
            let Expert: string[] = [];
            let StaffPick: string[] = [];
            let colorsUsage: string[] = [];
            this.filters = [
                {
                    Name: 'Usage',
                    ModelName: 'Usage',
                    Values: Usage,
                    Colors: colorsUsage
                },
                {
                    Name: 'Difficulty',
                    ModelName: 'Difficulty',
                    Values: Difficulty,
                },
                {
                    Name: 'Time to master',
                    ModelName: 'TimeToMaster',
                    Values: TimeToMaster
                },
                {
                    Name: 'Data privacy compliance',
                    ModelName: 'DataPrivacyCompliance',
                    Values: DataPrivacyCompliance
                },
                {
                    Name: 'Expert',
                    ModelName: 'Expert',
                    Values: Expert
                },
                {
                  Name: 'Staff pick',
                  ModelName: 'StaffPick',
                  Values: ['Yes', 'No']
                }
            ];
            // Add Usage, Difficulty, Time to master, Data privacy Compliance to the filters
            if ((results[0]['records'] instanceof Array) && (results[2]['records'] instanceof Array)) {
              var aux1 = results[0]['records'].filter(value => value.fields.Tool != '');
              var aux3 = results[2];
              //Keep ony tools that should be published
              //results[0] = results[0].filter(x => x.fields.Published);
              for (var i=0; i<this.filters.length-2; i++){
                var itemList = [];
                this.filters[i].Values = aux1
                  // Fetch raw data
                  .map(x => {
                    return x.fields[this.filters[i].Name]
                  })
                  // Parse data (can be both arrays or strings) and keep only distinct values
                  .reduce( (a: any, b: any) => {
                    a = this.checkCriteriaType(a);
                    b = this.checkCriteriaType(b);
                    return a.concat(b)
                  })
                  .reduce( (a: any, b: any) => {
                    return a.concat(b)
                  })
                  .forEach( (x: string) =>  {
                    if ((itemList.indexOf(x) == -1) && (x != "")) {
                      itemList.push(x);
                    }
                  })
                  // Sort the array of distinct values
                  this.filters[i].Values = itemList.sort();
              }
              // Add Tag colors to Usage
              for (var l=0; l<this.filters[0].Values.length; l++) {
                colorsUsage.push(this.dataService.getTagColor(this.filters[0].Values[l], aux3))
              }
            }
            // Add Experts name to the filter
            if (results[1]['records'] instanceof Array) {
              var aux2 = results[1]["records"].filter(x => x.fields.Name != '');
              for (var j=0; j < aux2.length; j++) {
                this.filters[4].Values.push(aux2[j].fields.Name);
              }
              this.filters[4].Values.sort()
            }

            for (const filter of this.filters) {
                if (filter.Values) {
                    this.criterias[filter.ModelName] = filter.Values.slice(0);
                }
            }
            // Dans le cadre de la beta, on ne travaille que sur le paramètre Usage pour filtrer les outils
            delete this.criterias['Usage'];
            this.change.emit(this.criterias);
            this.ready = true;
        });
    }

    /**
     * Bascule un critere de filtre on/off
     * @param name Le nom du critère
     * @param value La valeur du critère
     */
    public toggleCriteria(name, value) {
        let direction = -1;
        if (!this.criterias[name]) {
            this.criterias[name] = [value];
        } else {
            const index = this.criterias[name].indexOf(value);
            if (index === -1) {
                this.criterias[name].push(value);
            } else {
                if (this.criterias[name].length === 1)
                    delete this.criterias[name];
                else
                    this.criterias[name].splice(index, 1);
            }
        }
        this.allSelected = false;
        this.change.emit(this.criterias);
    }

    /**
     * Annule le filtrage et Réinitialise toutes valeurs d'un critère du filtre
     * @param name Le nom du critère
     */
    public restoreCriteria(name): void {
      // Supprimer tous les valeurs d'un critère est équivalent pour le pipe à avoir toutes les valeurs de ce critère
      delete this.criterias[name];
      this.allSelected = true;
      this.change.emit(this.criterias);
    }

    /**
     * Indique si un critere de filtre est on
     * @param name Le nom du critère
     * @param value La valeur du critère
     * @returns true si le critère de filtre est on sinon false
     */
    public hasCriteria(name, value): boolean {
        return this.criterias && this.criterias[name] && this.criterias[name].indexOf(value) !== -1;
    }

    /**
     * Indique si une typologie de critère possède des valeurs actives au niveau du filtre
     * @param name Le nom de la typologie de filtre (Usage, Difficulty, ...)
     * @returns true si ce type de critère possède au moins une valeur active au niveau de filtre est on sinon false
    */ public isCriteriaActive(name): void {
        console.log(this.criterias);
        (!this.criterias[name])? this.allSelected = true : this.allSelected = false;
    }

    public checkCriteriaType(item: any): string[] {
      var auxArr = [];
      if (Array.isArray(item) && item !== undefined) {
        auxArr.push(item.join().split(","))
      }
      else if (!Array.isArray(item) && item !== undefined) {
        auxArr.push(item.split(","));
      }
      return auxArr;
    }

  }
