import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  }
  constructor(public localstorageService: LocalstorageService) {

  }
  ngOnInit(): void {
    this.localstorageService.cargarFavoritos();

  }

}
