import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/providers/todo.service';
import Swal from 'sweetalert2';
import { Todo } from 'src/app/model/todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList:any[];
  loading:boolean = true;
  error:boolean=false;
  errMessage:string;
  
  busqueda = {
    descripcion: "",
    status: "Todos",
  }


  constructor(private ts:TodoService) { }

  ngOnInit() {
    let p:Observable<any>=this.ts.findAll();
    this.manageSearch(p);
  }

 
  manageSearch(peticion:Observable<any>){
    this.loading = true;
    peticion.subscribe(
      (cs:any[])=>{
        console.log(cs);
        this.todoList=cs;
        this.loading = false;
      },
     (err)=>{this.error=true;
      this.loading=false;
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
          this.ts.deleteTodo(todo).subscribe();  
        }
   
  });
}

setPendiente(todo:Todo){
      this.setStatus(todo,"Pendiente"); 
}
setCompletado(todo:Todo){
      this.setStatus(todo,"Completado"); 
}

setStatus(todo:Todo,estado:string){

    
        let estadoAnterior=todo.status;
        todo.status=estado;
        this.ts.updateTodo(todo).subscribe(
          resp => {console.log(this.busqueda.descripcion + "-" + this.busqueda.status);
                    if (this.busqueda.status!="Todos") {
                      this.searchTodo(this.busqueda.descripcion,this.busqueda.status);
                    }
                    
                }
          ,
          error=>{ Swal.fire({
                    title: "Error",
                    text: `Error actualizando el estado`,
                    type: 'error'
          });
          todo.status= estadoAnterior;
        }
        );  
}

searchTodo(descripcion:string,status:string) {

  let p:Observable<any>=this.ts.search(descripcion,status=="Todos"?"":status);
  this.manageSearch(p);
}

}
