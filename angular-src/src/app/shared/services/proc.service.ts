import { Injectable } from '@angular/core';
import {Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt'; 



@Injectable()
export class ProcService {

	proc : any ; 
  authToken:any;
  


  constructor(private http:Http) {}

  getProcs(){
  	let headers = new Headers();
  	this.loadToken();
  	headers.append('Authorization', "JWT "+this.authToken.substr(3));
  	headers.append('Content-Type','application/json');
  	return this.http.get('http://localhost:3000/procs/listerAll' ,  {headers: headers})
  	.map(res => res.json());
   }

  
  

   loadToken(){
  	const token = localStorage.getItem('id_token');
  	this.authToken = token ; 
  }

  loggedIn(){
    return tokenNotExpired();
  }

  logout(){
  	this.authToken = null;
  	this.proc = null ;
  	localStorage.clear();
  }


}
