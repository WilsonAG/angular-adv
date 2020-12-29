import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function initApp(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor(private ss: SettingsService, private sidebarSv: SidebarService) {}

  ngOnInit(): void {
    initApp();
    this.sidebarSv.loadMenu();
  }
}
