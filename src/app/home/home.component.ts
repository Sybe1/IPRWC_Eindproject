import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  serverStatus = ''
  homename = 'Sybe'
  buttonClicked = false
  amountButtonClicked: number[] = []

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline'
  }

  onCreateServer(){
    this.buttonClicked = true;
    this.amountButtonClicked.push(this.amountButtonClicked.length + 1)
  }

  getColor(){
    return this.serverStatus === 'online' ? 'green' : 'red'
  }
}
