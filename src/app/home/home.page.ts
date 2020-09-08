import { Component } from '@angular/core';
import { ServicioPersonasService } from '../servicios/servicio-personas.service';
import { ModalController } from '@ionic/angular';
import {ModalPersonaPage} from '../modal-persona/modal-persona.page';
import { Persona } from '../modelo/persona';
import { Router } from '@angular/router';
import {DetallePersonaPage} from '../detalle-persona/detalle-persona.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public servicio:ServicioPersonasService,public modalCtrl:ModalController,public router: Router) {}
  async addPersona()
  {
    //lanzar la modal
    const modal = await this.modalCtrl.create({
      component:ModalPersonaPage
    });
    await modal.present();
    let {data} = await modal.onWillDismiss();
    if(data)
    {
      this.servicio.addPersona(new Persona(data.data.nombre,data.data.apellido));
    }
    
  }
  eliminar(item:Persona)
  {
    this.servicio.eliminarPersona(item);
  }
  public navegar(id){
      this.router.navigate(['/detalle-persona/'+id]);
  }

}
