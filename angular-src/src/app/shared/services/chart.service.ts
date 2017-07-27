import { Injectable } from '@angular/core';
import {Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ChartService {
	authToken:any;

	
  constructor(private http:Http) {}

  getStats(type:string){
  	let headers = new Headers();
  	this.loadToken();
  	headers.append('Authorization', "JWT "+this.authToken.substr(3));
  	headers.append('Content-Type','application/json');
  	return this.http.get('http://localhost:3000/procs/getStats/'+type ,  {headers: headers})
  	.map(res => res.json());
   }


   loadToken(){
  	const token = localStorage.getItem('id_token');
  	this.authToken = token ; 
  }
}
