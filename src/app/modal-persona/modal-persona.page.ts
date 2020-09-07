import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-persona',
  templateUrl: './modal-persona.page.html',
  styleUrls: ['./modal-persona.page.scss'],
})
export class ModalPersonaPage implements OnInit {

  formulario;
  constructor(public formBuilder:FormBuilder, public modalCtrl:ModalController) { 
    this.formulario = formBuilder.group({
      nombre:['',Validators.compose([Validators.maxLength(30),Validators.minLength(2),Validators.required,Validators.pattern("[A-Za-z]*")])],
      apellido:['',Validators.compose([Validators.maxLength(30),Validators.minLength(2),Validators.required,Validators.pattern("[A-Za-z]*")])],

    });
  }

  ngOnInit() {
  }
  public cerrar(){
    this.modalCtrl.dismiss();

  }
  public enviar(value)
  {
    this.modalCtrl.dismiss({data:value});
  }

}
