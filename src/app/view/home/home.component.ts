import {Component, OnInit } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  image = 'assets/images/achtergrondBlauw.jpg';

  ngOnInit() {
    const tokenJWT = localStorage.getItem('loginToken')
    if (tokenJWT){
      console.log(jwtDecode(tokenJWT))
    }
  }
}
