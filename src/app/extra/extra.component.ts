import { Component } from '@angular/core';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.scss']
})
export class ExtraComponent {
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
