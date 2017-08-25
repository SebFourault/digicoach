import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { DialogRef, ModalComponent, CloseGuard } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';

export class ToolmodalContext extends BSModalContext {
  public tool;
}

@Component({
  selector: 'app-toolmodal',
  templateUrl: './toolmodal.component.html',
  styleUrls: ['./toolmodal.component.css']
})
export class ToolmodalComponent implements OnInit, CloseGuard, ModalComponent<ToolmodalContext> {

  context: ToolmodalContext;

  constructor(public dialog: DialogRef<ToolmodalContext>, public sanitizer: DomSanitizer) { 
    this.context = dialog.context;
    dialog.setCloseGuard(this);
    this.context.size = 'lg';
    this.context.isBlocking = false;
  }

  ngOnInit() {
  }

  beforeDismiss(): boolean {
    return false;
  }

  beforeClose(): boolean {
    return false;
  }

  embedify(url) {
    // DETECT URL LIKE https://www.youtube.com/watch?v=htPYk6QxacQ
    var youtubePattern = /\b(?:https?|ftp):\/\/www.youtube.com\/watch\?v=([a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|])/gim
    // DETECT URL LIKE https://www.useloom.com/share/4d85a469abea4dbea739b2d1735c8983
    var loomPattern = /\b(?:https?|ftp):\/\/www.useloom.com\/share\/([a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|])/gim
    return url
      .replace(youtubePattern, 'https://www.youtube.com/embed/$1?rel=0&amp;showinfo=0')
      .replace(loomPattern, 'https://www.useloom.com/embed/$1')
  }

  crispContactExpert(expert, tool) {
    window.$crisp.push(["do", "chat:open"]);
    window.$crisp.push(["do", "message:send", ["text", "Salut!"]]);
    window.$crisp.push(["do", "message:send", ["text", "J'aimerai poser une question à " + expert.fields['Name'] + " à propos de " + tool.fields['Tool'] + " :)" ]]);
  }

}
