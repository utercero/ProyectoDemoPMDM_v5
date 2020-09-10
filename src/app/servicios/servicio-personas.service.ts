import { Injectable, OnInit } from "@angular/core";
import { Persona } from "../modelo/persona";
import { StorageServiceService } from "./storage-service.service";
import { HttpServiceService } from "./http-service.service";

@Injectable({
  providedIn: "root",
})
export class ServicioPersonasService {
  public personas: Persona[] = [];
  constructor(
    private servicioStorage: StorageServiceService,
    private servicioHttp: HttpServiceService
  ) {
    this.servicioHttp.getList().subscribe(
      (datos) => {
        datos.map((persona) => Persona.fromJson(persona));
      },
      (error) => console.log(error)
    );
  }

  public addPersona(item: Persona) {
    this.personas = [...this.personas, item];
    this.servicioStorage.setObject("personas", this.personas);
  }
  public getPersona(id): Persona {
    return this.personas.find((persona) => persona.id == id);
  }
  public eliminarPersona(item: Persona) {
    let indice = this.personas.indexOf(item);
    this.personas = [
      ...this.personas.slice(0, indice),
      ...this.personas.slice(indice + 1),
    ];
    this.servicioStorage.setObject("personas", this.personas);
  }
  public get() {
    /*
    this.servicioHttp.getList().subscribe((data)=>{
      if(data)
      {
        data.map(persona=>Persona.fromJson(persona));
      }
    })*/
  }
}
