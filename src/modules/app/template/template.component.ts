import { LocalService } from './../../../services/local.service';
import { Component } from '@angular/core';

@Component({
  selector: 'main-layout',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent {
  title = 'SS.ERP_Web';
  isSidebarToggled: boolean = false;
  expandProfileMenu: boolean = false;
  isDropdownOpen = false;


  constructor(private localService: LocalService) {}

  ngOnInit(): void {}

  clickNavButton(): void {
    this.isSidebarToggled = !this.isSidebarToggled;
    this.localService.navButtonClick.emit();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
}

  toggleProfileMenu() {
    this.expandProfileMenu = !this.expandProfileMenu;
}

}
