import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoComponent } from './components/todo/todo.component';
/* import { MovieComponent } from './components/movie/movie.component'; */



export const ROUTES: Routes = [
    { path: 'todos', component: TodoListComponent },
    { path: 'todo/:id', component: TodoComponent },
    /* { path: 'movie/:id/:pag', component: MovieComponent }, */
    { path: '**', component: TodoListComponent },


];