import { Component, OnInit }  			from '@angular/core';
import { ApiService } 							from './api.service';
import { FormBuilder, Validators } 	from '@angular/forms';

interface LocalStorageData {
	login: string
	password: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	private response: string;
	private isSubmitted: boolean = false;
	private isLoading: boolean = false;
	private rememberUser: boolean = false;
	private isSuccessLoggin: boolean = false;

	public loginForm = this.formBuilder.group({
    email: ["", [Validators.required,  Validators.pattern(
      "^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$"
    )]],
    password: ["", [Validators.required,Validators.pattern(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$")]],
    rememberUser: false
  });

	constructor(
  	private apiService: ApiService,
  	public formBuilder: FormBuilder
  ) { }
  
  ngOnInit(): void {
  	let localStorageData: any = localStorage.getItem('authorization');
  	let parsedlLocalStorageData = JSON.parse(localStorageData);
  	if (parsedlLocalStorageData != null) {
  		if (parsedlLocalStorageData.hasOwnProperty("login") && parsedlLocalStorageData.hasOwnProperty("password")) {
  			this.onAuthorization(parsedlLocalStorageData.login, parsedlLocalStorageData.password)
  		}
  	}

  }

  doLogin(event): void {
  	this.isSubmitted = true;
  	
  	if (this.loginForm.valid) {
	  	let email: string = this.loginForm.value.email;
	  	let password: string = this.loginForm.value.password;
	  	this.onAuthorization(email, password);
  	}
  }

  onAuthorization(login: string, password: string):void {
  	this.isLoading = true;
		this.apiService.authorization(login, password).then(res => {
  		this.isLoading = false;
  		this.response = res;
  		if (this.response === "login successful") {
  			this.isSuccessLoggin = true;
  			if (this.loginForm.value.rememberUser) {
  				let localStorageData: LocalStorageData;
  				localStorageData = { login: this.loginForm.value.email, password: this.loginForm.value.password }
  				localStorage.setItem('authorization', JSON.stringify(localStorageData));
  			}
  		}
  	});
  }
}
