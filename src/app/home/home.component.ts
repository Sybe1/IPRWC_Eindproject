import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  serverId = 10;
  serverStatus = 'offline'

  getServerStatus(){
    return this.serverStatus
  }

  onCreateServer(){
    this.serverStatus = "Server created!"
  }
}
