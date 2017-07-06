import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public username: String = "";
	public password: String = "" ;
    
    constructor(public router: Router,	private authService:AuthService ) { }

    ngOnInit() { }

    onLoggedin() {
    	const user = {
  		username: this.username ,
  		password:this.password
  	}
  	console.log(user);
    
    this.authService.authenticateUser(user).subscribe(data => {
         if(data.success){
         	this.authService.storeUserData(data.token, data.user) ;
         	
         	console.log("Done !")
            localStorage.setItem('isLoggedin', 'true');
            console.log("going to root !")
            this.router.navigate(['/']);
         } else {

            
         	console.log("Not authenticated !")
         	
         }
    });
    }
    onLoginSubmit(){

  	}

}
