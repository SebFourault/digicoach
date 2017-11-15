import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ToolCriterias } from '../../shared/toolcriterias.model';
/* To delete */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Pipe({
    name: 'having'
})
export class HavingPipe implements PipeTransform {

    transform(tools?: any, criterias?: ToolCriterias): any {

        if (!criterias || !tools) {
            return tools;
        }
        /*
        return tools
            .filter(tool =>
              (!criterias['Difficulty'] || !tool.fields['Difficulty'] ||
                  criterias.Difficulty.find(criteria => (tool.fields.Difficulty.indexOf(criteria) != -1) ) )
                  //criterias.Difficulty.find(criteria => tool.fields.Difficulty === criteria) )
            )
        */

        return tools
            .filter(tool =>
                (!criterias['Usage'] || !tool.fields['Usage'] ||
                    criterias.Usage.find(criteria => (tool.fields.Usage.indexOf(criteria) !== -1) ))
                &&
                (!criterias['Difficulty'] || !tool.fields['Difficulty'] ||
                    criterias.Difficulty.find(criteria => (tool.fields.Difficulty.indexOf(criteria) !== -1) ))
                &&
                (!criterias['TimeToMaster'] || !tool.fields['TimeToMaster'] ||
                    criterias.TimeToMaster.find(criteria => (tool.fields.TimeToMaster.indexOf(criteria) !== -1) ))
                &&
                (!criterias['DataPrivacyCompliance'] || !tool.fields['DataPrivacyCompliance'] ||
                    criterias.DataPrivacyCompliance.find(criteria => (tool.fields.DataPrivacyCompliance.indexOf(criteria) !== -1) ))
            );
    }
}
