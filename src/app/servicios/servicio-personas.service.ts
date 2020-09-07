import { Injectable } from '@angular/core';
import {Persona} from '../modelo/persona';
@Injectable({
  providedIn: 'root'
})
export class ServicioPersonasService {
 

  public personas:Persona[];
  constructor() { 
    this.personas=[new Persona("Antonio","Perez"),
          new Persona("Ana","Diaz"),
          new Persona("Koldo","Fernandez")];
  }
  public addPersona(item:Persona){
    this.personas = [...this.personas,item];
  }
  public getPersona(id):Persona{
    return this.personas.find(persona=>persona.id==id);
  }
  public eliminarPersona(item: Persona) {
    let indice = this.personas.indexOf(item);
    this.personas = [...this.personas.slice(0,indice),...this.personas.slice(indice+1)];
  }

}
