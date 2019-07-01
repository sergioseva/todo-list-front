import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FileItem } from 'src/app/model/file-item';
import { CargarImagenesService } from 'src/app/providers/cargar-imagenes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  estaSobreElemento = false;
  archivo: FileItem ;
  mostrar:boolean=false;


  constructor( public _cargaImagenes: CargarImagenesService ) {

   }

  ngOnInit() {
  }

  cargarImagenes() {
    this._cargaImagenes.cargarImagen( this.archivo ).subscribe(
      data=>console.log(data)
    );
    this.archivo ? this.mostrar=true:this.mostrar=false;
  }



  //nueva prueba
  public imagePath;
  //imgURL: any;
  public message: string;
  @Output() archivoSeleccionado: EventEmitter<FileItem> = new EventEmitter();
  @Input() imgURL: any;
  
  preview(files) {
    this.message ="";
    console.log(files);
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "El archivo seleccionado no es una imagen";
      return;
    }
    if(files[0].size>1048576){
      this.message = "El tamaño maximo permitido es de 1 MB";
      return;
    }
    this.archivo=new FileItem(files[0]);
    this.archivoSeleccionado.emit(this.archivo);
    var reader = new FileReader();
    //this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    
  }

}
