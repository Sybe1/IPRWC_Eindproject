import {Component, Input} from '@angular/core';
import {Product} from "../../models/product";

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent {
  @Input() public nameOfPage: string | undefined;
}
