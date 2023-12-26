import {Component, OnInit } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {JwtPayload} from "../../models/jwt-payload";
import {UserService} from "../../services/user.service";
import {Product} from "../../models/product";
import {User} from "../../models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  image = 'assets/images/achtergrondBlauw.jpg';

  constructor(private userService: UserService) {
  }
  ngOnInit() {
    const tokenJWT = localStorage.getItem('loginToken')
    this.userService.getAllUsers().subscribe((response: User[]) => {
      for (let i = 0; i < response.length; i++) {
        console.log("deze " + response[i].username)
      }
    })
    if (tokenJWT){
      const decodedJWT = jwtDecode(tokenJWT) as JwtPayload
      console.log(decodedJWT)
      console.log(decodedJWT.username)
      console.log(decodedJWT.role[0].authority)
    }
  }
}
