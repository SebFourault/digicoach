import { Component, OnInit } from '@angular/core';

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

  constructor(public dialog: DialogRef<ToolmodalContext>) { 
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

}
