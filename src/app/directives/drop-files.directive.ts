import { Directive, EventEmitter, ElementRef,
  HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../model/file-item';


@Directive({
  selector: '[appDropFiles]'
})
export class DropFilesDirective {

  @Input() archivo: FileItem;
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  @Output() archivoOutput: EventEmitter<FileItem> = new EventEmitter();;

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any ) {
    this.mouseSobre.emit( true );
    this._prevenirDetener( event );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    this.mouseSobre.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any ) {

    const transferencia = this._getTransferencia( event );
    //console.log(transferencia);

    if ( !transferencia ) {
      return;
    }

    this._extraerArchivo( transferencia.files );

    this._prevenirDetener( event );
    this.mouseSobre.emit( false );

  }

  //para extender compatibilidad con navegadores
  private _getTransferencia( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivo( archivosLista: FileList ) {
    console.log("extraer archivo");
    console.log( archivosLista );

    // tslint:disable-next-line:forin
    for ( const propiedad in Object.getOwnPropertyNames( archivosLista ) ) {

      const archivoTemporal = archivosLista[propiedad];
      console.log( "archivoTemporal" );
      console.log( archivoTemporal );
      if ( this._archivoPuedeSerCargado( archivoTemporal ) ) {
        console.log( "_archivoPuedeSerCargado" );
        const nuevoArchivo = new FileItem( archivoTemporal );
        this.archivo=( nuevoArchivo );
        console.log(this.archivo);
        this.archivoOutput.emit(this.archivo);
      }
    }
  }


  // Validaciones
  private _archivoPuedeSerCargado( archivo: File ): boolean {

    if ( !this._archivoYaFueDroppeado( archivo.name ) && this._esImagen( archivo.type ) ){
      return true;
    }else {
      return false;
    }

  }


  private _prevenirDetener( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaFueDroppeado( nombreArchivo: string ): boolean {

      if ( this.archivo && (this.archivo.nombreArchivo === nombreArchivo)  ) {
        console.log('El archivo ' + nombreArchivo + ' ya esta agregado');
        return true;
      }
    return false;
  }

  private _esImagen( tipoArchivo: string ): boolean {
    return ( tipoArchivo === '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith('image');
  }

}
