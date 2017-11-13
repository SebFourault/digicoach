import { Pipe, PipeTransform } from '@angular/core';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ToolCriterias } from '../../shared/toolcriterias.model';

@Pipe({
    name: 'having'
})
export class HavingPipe implements PipeTransform {
    constructor() { }

    transform(tools?: any, criterias?: ToolCriterias): any {

        if (!criterias || !tools) {
            return tools;
        }

        return tools
            .filter(tool =>
                (!criterias['Usage'] || !tool.fields['Usage'] ||
                    criterias.Usage.find(criteria => tool.fields.Usage.toUpperCase() === criteria.toUpperCase()))
                &&
                (!criterias['Difficulty'] || !tool.fields['Difficulty'] ||
                    criterias.Difficulty.find(criteria => tool.fields.Difficulty.toUpperCase() === criteria.toUpperCase()))
                &&
                (!criterias['TimeToMaster'] || !tool.fields['TimeToMaster'] ||
                    criterias.TimeToMaster.find(criteria => tool.fields.TimeToMaster.toUpperCase() === criteria.toUpperCase()))
                &&
                (!criterias['DataPrivacyCompliance'] || !tool.fields['DataPrivacyCompliance'] ||
                    criterias.DataPrivacyCompliance.find(criteria => tool.fields.DataPrivacyCompliance.toUpperCase() === criteria.toUpperCase()))
                &&
                (!criterias['Expert'] || !tool.fields['Expert'] ||
                    criterias.Expert.find(criteria => tool.fields.Expert.toUpperCase() === criteria.toUpperCase()))
                &&
                (!criterias['StaffPick'] || !tool.fields['StaffPick'] ||
                    criterias.StaffPick.find(criteria => tool.fields.StaffPick.toUpperCase() === criteria.toUpperCase()))
            );
    }
}
