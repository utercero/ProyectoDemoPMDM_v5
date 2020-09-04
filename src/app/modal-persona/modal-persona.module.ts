import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPersonaPageRoutingModule } from './modal-persona-routing.module';

import { ModalPersonaPage } from './modal-persona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPersonaPageRoutingModule
  ],
  declarations: [ModalPersonaPage]
})
export class ModalPersonaPageModule {}
