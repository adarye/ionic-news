import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from './../interfaces/interfaces';
import { ToastController } from '@ionic/angular';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';


@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  noticias: Article[] = [];
  constructor(private storage: Storage, public toastCtrl: ToastController) {
    this.init();
  }

  async init() {
    console.log('entre init');
    const storage = await this.storage.create();
  }
  guardarNoticia(noticia: Article) {
    console.log(this.noticias);
    const existe = this.noticias.find(not => not.title === noticia.title)
    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias)
      this.presentToast('Agregado a favoritos correctamente');
    }

  }

 async cargarFavoritos() {
   console.log('entre carga');
   const favoritos =  await this.storage.get('favoritos');
   if(favoritos != null){
    this.noticias = favoritos;
   }
  }
  borrarNoticia(noticia: Article){
    this.noticias = this.noticias.filter(not => not.title !== noticia.title);
    this.storage.set('favoritos', this.noticias)
    this.presentToast('Se ha quitado de favoritos correctamente');

  }
  async presentToast(mensaje:string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: 'primary',
      mode: 'ios'

    });
    toast.present();
  }
}
