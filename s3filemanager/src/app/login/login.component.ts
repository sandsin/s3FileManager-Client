import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {
    AuthService,
    GoogleLoginProvider
} from 'angular-6-social-login';



@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {

    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private socialAuthService: AuthService) {}

    ngOnInit() {

        this.returnUrl = 'home';
    }


    public socialSignIn(socialPlatform: string) {
        let socialPlatformProvider;
        if (socialPlatform === 'google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }
        this.socialAuthService.signIn(socialPlatformProvider).then(
            data => {
                console.log(socialPlatform+" sign in data : " , data);
                console.log(data);
                localStorage.setItem('currentUser', JSON.stringify(data));
                this.router.navigate([this.returnUrl]);
            });
    }
}
