import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  crispMessage(text) {
    window.$crisp.push(["do", "chat:open"]);
    window.$crisp.push(["do", "message:send", ["text", text]]);
  }

}
