import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Todo } from '../model/todo.model';
import { FileItem } from '../model/file-item';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  private URLTodoService:string="//localhost:8080/api/todos";

  constructor(private http:HttpClient) { }

  findAll() {
    let url:string=`${ this.URLTodoService }`

    return this.http.get(url)
          .pipe(
            map((todos:any)=>todos)
          );
  }

  search(descripcion:string,status:string) {
    let url:string=`${ this.URLTodoService }`

    return this.http.get(this.URLTodoService + `/search?descripcion=${descripcion}&status=${status}`)
          .pipe(
            map((todos:any)=>todos)
          );
  }

  insertTodo( todo:Todo,imagen?:FileItem ){

    let body = JSON.stringify( todo );
    let headers = new HttpHeaders({
      'Content-Type':'multipart/form-data'
    });
    let formdata: FormData = new FormData();
     
    formdata.append('todo', body);
    if (imagen) {
           formdata.append('file', imagen.archivo);
    }

    return this.http.post(  this.URLTodoService, formdata).pipe(
      map( res=>{
        return res;
      })
    )
 
  }

  updateTodo( todo:Todo,imagen?:FileItem ){

    let body = JSON.stringify( todo );
    let url = `${ this.URLTodoService }/${ todo.id }`;

    let formdata: FormData = new FormData();
    formdata.append('todo', body);
    if (imagen) {
           formdata.append('file', imagen.archivo);
    }
    return this.http.put(  url , formdata  ).pipe(
          map( res=>{
            return res;
          })
    )
  }

  getTodo( key$:string ){

    let url = `${ this.URLTodoService }/${ key$ }`;
    return this.http.get( url ).pipe(
      map( res=>res ));
   }

  
  deleteTodo( todo:Todo){

    let url = `${  this.URLTodoService  }/${ todo.id }`;
    return this.http.delete( url ).pipe(
      map( res => res )
    );
        

  }
}
