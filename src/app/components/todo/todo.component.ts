import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { TodoService } from 'src/app/providers/todo.service';
import { Todo } from 'src/app/model/todo.model';

import Swal from 'sweetalert2';
import { Observable} from 'rxjs';
import { FileItem } from 'src/app/model/file-item';
import { CargarImagenesService } from 'src/app/providers/cargar-imagenes.service';
import { TodoImagePipe } from 'src/app/pipes/todo-image.pipe';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent implements OnInit {

  todo:Todo= new Todo();
  public archivo:FileItem;
  id:string;
  updateImg:any;

  constructor(
              public cis: CargarImagenesService,
              private ts: TodoService,
              private router:Router,
              private route:ActivatedRoute,
              private ip:TodoImagePipe ){

    this.route.params
        .subscribe( parametros=>{
          this.id = parametros['id']
          if( this.id !== "nuevo" ){
            this.ts.getTodo( this.id )
                  .subscribe( (todo:Todo) =>{ this.todo = todo;
                                              this.updateImg =  ip.transform(todo)} )
          } else {
            this.todo.status="Pendiente";
          }

        });
  }

  ngOnInit() {
  }


  guardar( form: NgForm ){
    console.log(this.todo);
    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;
    let isInsert:boolean=false;

    if ( this.todo.id ) {
      peticion = this.ts.updateTodo( this.todo,this.archivo );
    } else {
      peticion = this.ts.insertTodo( this.todo ,this.archivo);
      isInsert=true;
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: "Tarea",
        text: `Se ${ isInsert ? "insertó" : "actualizó"} correctamente`,
        type: 'success'
      });
      this.router.navigate(['/todos']);
    },
    errr=> {
      Swal.fire({
        title: "Tarea",
        text: `Error al ${ isInsert ? "insertar" : "actualizar"}`,
        type: 'error'
      });
    });
    

  }

  agregarNuevo( forma:NgForm ){
    
    forma.reset({
      estado:"pendiente"
    });

  }

  setPendiente(){
    this.todo.status="Pendiente";
  }

  setCompletado(){
    this.todo.status="Completado";
  }

  estaPendiente(){
      return this.todo.status!="Completado";
  }

  guardarArchivo(f:FileItem){
    console.log("guardar archivo");
    this.archivo=f;
    console.log(f);
    console.log(this.archivo);
  }

}

