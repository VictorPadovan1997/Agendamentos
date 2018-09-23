import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController  } from 'ionic-angular';
import { Http } from '@angular/http';
import { EscolhaPage } from '../escolha/escolha'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  
  public carros = [];

  constructor(
    public navCtrl: NavController,
    private _http: Http,
    private _loadingCtrl: LoadingController,

    private _alertCtrl: AlertController) {}


  ngOnInit(): void {
    let loading = this._loadingCtrl.create({
      content: 'Aguarde, buscando os serviços no servidor.'
    });
    
    loading.present();
    
    this._http.get('assets/data/data.json')
              .map(res => res.json())
              .toPromise()
              .then(obj => {
                this.carros = obj
                loading.dismiss();
              })
             .catch(err => {
               loading.dismiss();
               console.log(err);
               this._alertCtrl.create({
                 title: 'Falha na conexão com a internet',
                 subTitle: 'Não foi possível obter os serviços, feche e abre o aplicativo.',
                 buttons: [{ text: 'Estou ciente.' }]
               }).present();
              }
            );

  }
  seleciona(carro: any) {
    this.navCtrl.push(EscolhaPage, { carroSelecionado: carro });

    console.log(carro);
  }
  
};