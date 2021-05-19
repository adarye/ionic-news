
import { Article } from './../../interfaces/interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() item: Article;
  @Input() i: number;
  @Input() enFavoritos;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private socialSharingCtrl: SocialSharing,
    private iab: InAppBrowser,
    private localstorageService: LocalstorageService
  ) { }

  ngOnInit() { }
  abrirNoticia() {
    const browser = this.iab.create(this.item.url, '_system')

  }

  async lanzarMenu() {

    let borrarBnt;
    if (this.enFavoritos) {
      borrarBnt = {
        text: 'Borrar favorito',
        icon: 'trash',
        handler: () => {
          this.localstorageService.borrarNoticia(this.item)
        }
      }
    } else {
      borrarBnt = {
        text: 'Favorito',
        icon: 'heart',
        handler: () => {
          this.localstorageService.guardarNoticia(this.item)
        }
      }
    }
    const actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          this.socialSharingCtrl.share(this.item.title, this.item.source.name, '', this.item.url)
        }
      },
      borrarBnt,
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
