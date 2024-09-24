import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkeletonComponent } from './pages/skeleton/skeleton.component';
import { HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MissingTranslationService } from './services/missing-translation.service';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { MenuModule} from 'primeng/menu';
import { environment } from './environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ACCESS_TOKEN_KEY, AuthService } from './services/api/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from 'primeng/confirmdialog';




export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

export function tokenGetter() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

const providers = [
    AuthService,
    MessageService,
    ConfirmationService
]


@NgModule({
  declarations: [
    AppComponent,
    SkeletonComponent,
  ],
  imports: [
    BrowserModule,
    MenuModule,
    AppRoutingModule,
    HttpClientModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    ToastModule,
    JwtModule.forRoot({
        config: {
            tokenGetter,
            allowedDomains: environment.tokenWhiteListedDomains
        }
    }),

    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
        },
        missingTranslationHandler: { 
            provide: MissingTranslationHandler, 
            useClass: MissingTranslationService 
        },
        useDefaultLang: false
    }),
    
  ],
  providers: [
    {
        provide: 'API_URL',
        useValue: environment.apiUrl
    },
    providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
