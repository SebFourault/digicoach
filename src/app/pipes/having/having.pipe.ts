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
                (!criterias['TimeToMaster'] || !tool.fields['Time to master'] ||
                    criterias.TimeToMaster.find(criteria => (tool.fields['Time to master'].indexOf(criteria) !== -1) ))
                &&
                (!criterias['DataPrivacyCompliance'] || !tool.fields['Data privacy compliance'] ||
                    criterias.DataPrivacyCompliance.find(criteria => (tool.fields['Data privacy compliance'].indexOf(criteria) !== -1) ))
                &&
                (!criterias['StaffPick'] || !tool.fields['Staff pick filter'] ||
                    criterias.StaffPick.find(criteria => (tool.fields['Staff pick filter'].indexOf(criteria) !== -1) ))
            );
    }
}
