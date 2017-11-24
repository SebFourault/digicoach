import { Component, OnInit, Injectable } from '@angular/core';
import { JsonpModule, Jsonp, Response } from '@angular/http'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  public result: any;
  public emailSubmit: boolean;
  public success: boolean;
  constructor(private jsonp: Jsonp) {}
  //constructor() {}
  ngOnInit(): void {
    this.emailSubmit = false;
  }
  onSubmit(f: NgForm)  {
    let email = f.value.EMAIL;
    let url = 'https://geekup.us17.list-manage.com/subscribe/post-json?u=4a3d493e65679baac69a3ae66&id=582471fd4b&subscribe=Subscribe&EMAIL='+email+'&c=JSONP_CALLBACK';
    this.jsonp.request(url, { method: 'Get' })
        .subscribe((res) => {
          this.result = res.json();
          (this.result['result'] === 'success')? this.success = true:this.success = false;
          this.emailSubmit = true; });
  }
}
