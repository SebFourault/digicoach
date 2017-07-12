import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tools;

  constructor( private dataService : DataService ) { }

  ngOnInit() {
    this.dataService.getTable("Tools").then( data => this.tools = data );
  }

}
