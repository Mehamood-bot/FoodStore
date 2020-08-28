import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatListModule, MatGridListModule, MatCardModule, MatButtonModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import "hammerjs";
import { FormsModule } from "@angular/forms"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './menu/menu.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { MaterialModule } from './shared/material';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';
import { HighlightDirective } from './directives/highlight.directive';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishDetailsComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective,
    
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatToolbarModule,
      FlexLayoutModule,
      MatListModule,
      MatGridListModule,
      MatCardModule,
      MatButtonModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
   
    ],
    entryComponents:[LoginComponent],
    providers: [
        { provide: 'BaseURL', useValue: baseURL }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
