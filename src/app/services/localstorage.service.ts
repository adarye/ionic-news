import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from './../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  noticias: Article[] = [];
  constructor(private storage: Storage) {
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
    }

  }
 async cargarFavoritos() {
   console.log('entre carga');
   const favoritos =  await this.storage.get('favoritos');
   if(favoritos != null){
    this.noticias = favoritos;
   }



  }
}
