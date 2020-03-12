import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor(private _auth: AuthService,
              private _router: Router) { }

loginUserData:User = {username: '',password: ''};
 msgLogin:string;

  loginUser () {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate([`/secure/${this.loginUserData.username}`])
      },
      err => {
        this.msgLogin = "אינך מורשה"
      }
    ) 
  }

  ngOnInit() {
  }
}
