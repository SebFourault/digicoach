import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { DataService } from './services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public paths;
    public selectedValue;

    constructor( private dataService : DataService, private router : Router ) { }

    ngOnInit() {
      this.dataService.getTable("LearningPaths").then( data => {
        this.paths = data; 
        console.log(data);
        var randomGoal = Math.floor((Math.random() * data.records.length));
        this.selectedValue = this.paths.records[randomGoal];
      });
    }

    showLearningPath() {
      this.router.navigate(['/learningpath', {id: this.selectedValue.id}]); 
      return false;
    }

}
