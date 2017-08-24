import { Injectable } from '@angular/core';
import { Http, Response }     from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

  private apiKey = "keyLtjlBongEfqxXa";
  airtableUrl = 'https://api.airtable.com/v0/app8NspdipCZRwGXM/';

  constructor(private http: Http) { }



  getTable(tableName): Promise<any> {
    var url = this.airtableUrl + tableName + '?view=Grid%20view&api_key=' + this.apiKey;
    return this.http.get(url)
          .toPromise()
          .then((response:Response) => response.json() as any)
          .catch(this.handleError);
          //.map((res:Response) => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }




  // Agregation functions

  count(object) {
    return (object != null && object != "") ? Object.keys(object).length : 0;
  }

  sum(object, collumn) {
    var result = 0;
    for (var i = 0; i < Object.keys(object).length; i++) {
      result += ( object[i][collumn] == "" ) ? 0 : parseInt( object[i][collumn] );
    }
    return result;
  }

  getDistinctValues(myTable, myColumn: string): any {
    var distinctValues = [];
    for (var i = 0; i < Object.keys(myTable).length; i++) {
      if ((distinctValues.indexOf(myTable[i][myColumn]) == -1) && (myTable[i][myColumn] != "")) {
        distinctValues.push(myTable[i][myColumn]);
      }
    }
    return distinctValues;
  }

  prettyDate(date, label = "Date") {
    var myDate = new Date(date);
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return (date != "") ? myDate.getDate() + " " + monthNames[myDate.getMonth()] : "No " + label ;
  }

}
