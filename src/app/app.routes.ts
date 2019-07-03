import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoComponent } from './components/todo/todo.component';
import { HomeComponent } from './components/home/home.component';




export const ROUTES: Routes = [
    { path: 'todos', component: TodoListComponent },
    { path: 'todo/:id', component: TodoComponent },
    { path: '**', component: HomeComponent },

];