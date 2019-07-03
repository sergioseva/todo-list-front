import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

//routes
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';


import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { TodoImagePipe } from './pipes/todo-image.pipe';
import { TodoComponent } from './components/todo/todo.component';
import { FormsModule } from '@angular/forms';
import { CargaComponent } from './components/carga/carga.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TodoListComponent,
    TodoImagePipe,
    TodoComponent,
    CargaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [TodoImagePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
