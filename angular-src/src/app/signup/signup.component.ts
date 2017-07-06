import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../shared/services/validate.service'
import {AuthService} from '../shared/services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages' ; 
import {Router} from '@angular/router' ; 

@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
name: String;
username: String;
email: String;
password: String;

  constructor(
              private validateService: ValidateService , 
              //private flashMessage:FlashMessagesService , 
              private authService:AuthService , 
              private router:Router 
              ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
    name: this.name,
    username: this.username,
    email: this.email,
    password: this.password
    }

    //Required Fields
    if(!this.validateService.validateRegister(user)){
    //this.flashMessage.show('Il faudra renseigner tous les champs pour vous inscrire' , {cssClass: 'alert-danger' , timeout: 11000});
    return false;
    }

    //Validate Email
    if(!this.validateService.validateEmail(user.email)){
    //this.flashMessage.show('Veuillez saisir une adresse mail valide' , {cssClass: 'alert-danger' , timeout: 11000});
    return false;
    }

    // Register User 
     this.authService.registerUser(user).subscribe(data => {
       if(data.sucess){
             //this.flashMessage.show('Vous êtes maintenant enregistré , vous pouvez acceder à votre compte' , {cssClass: 'alert-success' , timeout: 11000});
             this.router.navigate(['/login']);
       } else {
          //this.flashMessage.show('Il y a un problème quelque part' , {cssClass: 'alert-danger' , timeout: 11000});
             this.router.navigate(['/register']);
       }
     });
  }}
  