import { Component } from '@angular/core';
import { ServicioPersonasService } from '../servicios/servicio-personas.service';
import { Persona } from '../modelo/persona';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public servicio:ServicioPersonasService) {}
  addPersona()
  {
    this.servicio.addPersona(new Persona("Prueba","Prueba"));
  }

}
