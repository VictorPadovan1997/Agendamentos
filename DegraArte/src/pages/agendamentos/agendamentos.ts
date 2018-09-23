import {AgendamentoService} from '../../domain/agendamento/agendamento-service';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { AgendamentoDao } from '../../domain/agendamento/agendamento-dao';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-agendamentos',
  templateUrl: 'agendamentos.html'
})


export class AgendamentosPage {

  public agendamentos: Agendamento[];

  private _alert: Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _dao: AgendamentoDao,
    private _service: AgendamentoService,
    private _alertCtrl: AlertController) {
    
    this._dao.listaTodos()
      .then((agendamentos) => {
        this.agendamentos = agendamentos;
      });

    this._alert = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{text: 'ok'}]
    });
  }


  removeItem(no){
    (this.agendamentos).splice(no, 1);
  };
}
 
  


 

