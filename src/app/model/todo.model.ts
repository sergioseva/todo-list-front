export class Todo{


    descripcion:string;
    status: string;
    image:string;
    id:number;
/*     setPendiente(){
      console.log("setPendiente");
      status="Pendiente";
      console.log(status);
    };
    setCompletado(){
      console.log("setCompletado");
      status="Completado";
    }; */
    pendiente(){
      return status!="Completado";
    };

  }
