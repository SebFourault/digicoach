import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { environment } from 'environments/environment';
import { DataService } from 'app/services/data/data.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Injectable()
export class ToolsService {
    private _tools: any[];

    constructor(private _dataService: DataService) { }

    /**
     * Retourne la liste complète des outils
     */
    public list(): Observable<any[]> {

        return Observable.forkJoin([
            this._dataService.observeTable('Tools')
        ]).map((results: any[]) => {
            const tools: any[] = results[0];
            this._tools = tools;
            return tools;
        });
    }

  }
