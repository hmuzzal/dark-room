import { LocalService } from './../../services/local.service';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ChildActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

isSidebarToggled: boolean = false;

constructor(private localService:LocalService, public router: Router, private titleService: Title) {
  this.router.events
  .pipe(filter(event => event instanceof ChildActivationEnd))
  .subscribe(event => {
      let snapshot = (event as ChildActivationEnd).snapshot;
      while (snapshot.firstChild !== null) {
          snapshot = snapshot.firstChild;
      }
      this.titleService.setTitle(snapshot.data['title'] || 'SS ERP');
  });
}

  ngOnInit(): void {
    this.localService.navButtonClick.subscribe(() => {
      this.isSidebarToggled = !this.isSidebarToggled;
    });
  }
}
