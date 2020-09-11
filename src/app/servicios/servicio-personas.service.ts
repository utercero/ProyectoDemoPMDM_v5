import { Injectable, OnInit } from "@angular/core";
import { Persona } from "../modelo/persona";
import { StorageServiceService } from "./storage-service.service";
import { HttpServiceService } from "./http-service.service";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ServicioPersonasService {
  public personas: Persona[] = [];
  constructor(
    private servicioStorage: StorageServiceService,
    private servicioHttp: HttpServiceService
  ) {
    this.servicioStorage.getObject("personas").then((data)=>{
      if(data)
        this.personas = <Persona[]><unknown>data;
    })
    this.delay(3000).then(any=>{
      this.servicioHttp.getList().subscribe(
        (datos) => {
          datos.map((persona) => Persona.fromJson(persona));
          this.personas = datos;
          this.servicioStorage.setObject("personas",this.personas);

        },
        (error) => console.log(error)
      );

    });
  }
  
  public addPersona(item: Persona) {
    this.servicioHttp.createItem(item).subscribe(
      (data) => {
        console.log(data);
        this.servicioStorage.setObject("personas",this.personas).then(()=>{
          this.personas = [...this.personas,item];
        })
        .catch((error)=>{
          //hay que decidir que hacer. 
          //el storage no es importante y actualizo this.personas
          this.personas = [...this.personas,item];
          //el storage es importante
         // this.servicioHttp.deleteItem(data.id);

        })
      },
      (error) => {
        console.log(error);
      }
    );
    //this.servicioStorage.setObject("personas", this.personas);
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
    //this.servicioHttp.deleteItem(item);
    //this.servicioStorage.setObject("personas", this.personas);
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
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(
      ()=>
      {
        console.log("fired");
      }
      );
}
}
