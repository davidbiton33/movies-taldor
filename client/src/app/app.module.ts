import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { ActiveLink } from './pipes';
import * as $ from "jquery";



@NgModule({
  providers: [AuthService, AuthGuard, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
    imports: [
      BrowserModule,
      AppRoutingModule,
      NgbModule,
      HttpClientModule,
      FormsModule
    ],
  declarations: [
    ActiveLink,

    AppComponent,
    EditorComponent,
    AddMovieComponent,
    MovieItemComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
