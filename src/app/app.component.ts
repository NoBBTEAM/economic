import { Component } from '@angular/core';
import { MicrocosmicService } from './pages/microcosmic/microcosmic.service';
import { IntermediateService } from './pages/intermediate/intermediate.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
  providers: [MicrocosmicService, IntermediateService]
})
export class AppComponent {
  title = 'app';
}
