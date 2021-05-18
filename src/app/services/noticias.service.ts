import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from './../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;


const headers = new HttpHeaders({
  'X-Api-Key': apiKey
})

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {



  constructor(private http: HttpClient) { }
  headlinesPage: number = 0;
  categoriaActual: string = '';
  categoriaPage:number = 0;
  private ejecutarQuery<T>(query: string) {
    let query2 = apiUrl + query;
    return this.http.get<T>(query2, { headers })
  }

  getTopHeadlines() {
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }
  getByCategory(categoria: string) {
    if(this.categoriaActual === categoria){
      this.categoriaPage++
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);

  }
}
