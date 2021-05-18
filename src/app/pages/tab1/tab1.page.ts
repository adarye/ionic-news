import { Component } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from './../../interfaces/interfaces';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  scroll:boolean = false;
  noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService
  ) {
    this.cargarNoticias();

  }
  loadData(event) {
    this.cargarNoticias(event);
  }
  cargarNoticias(event?) {
    this.noticiasService.getTopHeadlines().subscribe(res => {
      this.noticias.push(...res.articles)
      if(res.articles.length <= 0){
        this.scroll = true;
        event.target.complete();
      }
      if(event){
         event.target.complete();
      }

    })
  }

}
