import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverStatusCreation = 'no server was created';
  serverName = "";
  constructor() {
      setTimeout(() => {
        this.allowNewServer = true;
      }, 2000);
  }

  ngOnInit() {
  }
  onCreateServer() {
    this.serverStatusCreation = 'Server was created';
  }
  onUpdateServerName(event:any){
    this.serverName = event.target.value;
  }
}
