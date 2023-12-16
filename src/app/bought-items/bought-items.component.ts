import { Component } from '@angular/core';

@Component({
  selector: 'app-bought-items',
  templateUrl: './bought-items.component.html',
  styleUrls: ['./bought-items.component.scss']
})
export class BoughtItemsComponent {

  public pageRefreshing(): void{
    window.location.reload();
  }
}
