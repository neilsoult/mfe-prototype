import { Component } from '@angular/core';
import { CounterFacade } from '@mfe-prototype/counter';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {

  count$ = this.counterFacade.count$;

  constructor (private counterFacade: CounterFacade) {}

  addCounter () {

    this.counterFacade.add();

  }

}
