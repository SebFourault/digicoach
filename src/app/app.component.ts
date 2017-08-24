import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public paths;
    public selectedValue;

    constructor( private dataService : DataService ) { }

    ngOnInit() {
      this.dataService.getTable("LearningPaths").then( data => {
        this.paths = data;
        var randomGoal = Math.floor((Math.random() * data.records.length));
        this.selectedValue = this.paths.records[randomGoal];
      });
    }

}
