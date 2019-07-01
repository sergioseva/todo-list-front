import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/providers/todo.service';
import Swal from 'sweetalert2';
import { Todo } from 'src/app/model/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList:any[];
  cargando:boolean = true;
  error:boolean=false;
  errMessage:string;
  constructor(private ts:TodoService) { }

  ngOnInit() {
    this.cargando = true;
    this.ts.getTodos().subscribe(
      (cs:any[])=>{
        console.log(cs);
        this.todoList=cs;
        this.cargando = false;
      },
     (err)=>{this.error=true;
      this.cargando=false;
             this.errMessage="Error conectando al servidor, estamos trabajando para solucionar el problema"}
    )
  }

 

  borraTodo( todo:Todo,i:number){
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ todo.descripcion }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

        if ( resp.value ) {
          this.todoList.splice(i, 1);
          this.ts.borrarTodo(todo).subscribe();  
        }
   
  });
}

setPendiente(todo:Todo){
      this.setEstado(todo,"Pendiente"); 
}
setCompletado(todo:Todo){
      this.setEstado(todo,"Completado"); 
}

setEstado(todo:Todo,estado:string){
  Swal.fire({
    title: '¿Está seguro?',
    text: `Está seguro que desea cambiar el estado?`,
    type: 'question',
    showConfirmButton: true,
    showCancelButton: true
  }).then( resp => {

      if ( resp.value ) {
        let estadoAnterior=todo.status;
        todo.status=estado;
        this.ts.actualizarTodo(todo).subscribe(
          resp => {}
          ,
          error=>{ Swal.fire({
                    title: "Error",
                    text: `Error actualizando el estado"}`,
                    type: 'error'
          });
          todo.status= estadoAnterior;
        }
        );  
      }
 
});

}

}
