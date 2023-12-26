import {Component, OnInit} from '@angular/core';
import {IsUserLoggedInService} from "../../services/is-user-logged-in.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
   isLoggedOut: boolean = true;

   constructor(private data: IsUserLoggedInService) {
   }
   ngOnInit() {
     this.data.currentStatus.subscribe(message => this.isLoggedOut = message)
   }
}
