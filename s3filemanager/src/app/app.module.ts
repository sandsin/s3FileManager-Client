import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
} from "angular-6-social-login";

// used to create fake backend

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';


import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor} from './_helpers';
import { AlertService} from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';

export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig(
        [
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider("782627654374-qji014hdouhi65sc5e7n6k7ugvufo4fn.apps.googleusercontent.com")
            }
        ]);
    return config;
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        SocialLoginModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
