import { Injectable } 		 from '@angular/core';
import { Http, Response }  from '@angular/http';
import { Observable } 		 from 'rxjs/Observable';

@Injectable()
export class ApiService {

  constructor() { }
 
	authorization(login: string, password: string): Promise<any> {
		return new Promise((resolve) => 
  		setTimeout(() => resolve(this.getMockData(login, password)), 2000)
		)
	}

	getMockData(login: string, password: string): string {
		let response: string;
		if (login === "test@test.pl" && password === "Password1") {
			response = "login successful";
		}
		else {
			response = "invalid email or password";
		}
		return response;
	}
}
