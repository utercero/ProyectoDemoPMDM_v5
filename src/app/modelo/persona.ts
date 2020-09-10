export class Persona {
    
    constructor(public nombre:string,public apellido:string,public id:number=-1){
        
    }
    clonar():Persona{
        return new Persona(this.nombre,this.apellido,this.id);
    }
    public static fromJson (data): Persona {
                   
        if(!data.id || !data.nombre || !data.apellido){                
           throw (new Error("Invalid argument structure do not match with model fields"));
        }        
        return new Persona(data.nombre,data.apellido,data.id);
    }
}
