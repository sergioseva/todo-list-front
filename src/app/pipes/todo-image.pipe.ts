import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../model/todo.model';

@Pipe({
  name: 'todoImage'
})
export class TodoImagePipe implements PipeTransform {

  transform( todo: Todo  ): any {

    let url = "http://localhost:8080/fileapi/";

    if( todo.image ){
      console.log(todo.descripcion);
      return url + todo.id + "-" + todo.image;
    }else{
         return "assets/img/no-img.png"
      }
    
    }

  }


