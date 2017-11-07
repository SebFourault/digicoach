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

    @Input()
    public criterias: ToolCriterias = new ToolCriterias();

    @Output()
    public change: EventEmitter<ToolCriterias> = new EventEmitter<ToolCriterias>();

    constructor(
        private dataService: DataService
    ) { }

    public ngOnInit() {
        Observable.onErrorResumeNext(
            Observable.forkJoin([
                this.dataService.observeTable('Tools')
            ])
        ).subscribe(results => {
            let Usage: string[];
            let Difficulty: string[];
            let TimeToMaster: string[];
            let DataPrivacyCompliance: string[];
            let Expert: string[];
            let StaffPick: string[];
            if (results[0] instanceof Array) {
                Usage = results[0]
                    .filter(corestream => corestream.Name.length)
                    .map(x => { return x.Name })
                    .sort((lhv, rhv) => lhv.localeCompare(rhv));
            }

            // Populate the filters dynamically
            this.filters = [
                {
                    Name: 'Usage',
                    Values: Usage
                },
                {
                    Name: 'Difficulty',
                    Values: Difficulty
                },
                {
                    Name: 'TimeToMaster',
                    Values: TimeToMaster
                },
                {
                    Name: 'Data Privacy Compliance',
                    Values: DataPrivacyCompliance
                },
                {
                    Name: 'Expert',
                    Values: Expert
                },
                {
                  Name: 'Staff Pick',
                  Values: StaffPick
                }
            ];

            for (const filter of this.filters) {
                if (filter.Values) {
                    this.criterias[filter.Name] = filter.Values.slice(0);
                }
            }

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

        this.change.emit(this.criterias);
    }

    /**
     * Indique si un critere de filtre est on
     * @param name Le nom du critère
     * @param value La valeur du critère
     * @returns true si le critère de filtre est on sinon false
     */
    public hasCriteria(name, value) {
        return this.criterias && this.criterias[name] && this.criterias[name].indexOf(value) !== -1;
    }

  }
