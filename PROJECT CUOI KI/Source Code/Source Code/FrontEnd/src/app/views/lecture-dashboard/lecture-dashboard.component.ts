import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../lecture-nav';
@Component({
  selector: 'app-lecture-dashboard',
  templateUrl: './lecture-dashboard.component.html',
  styleUrls: ['./lecture-dashboard.component.scss']
})
export class LectureDashboardComponent implements OnDestroy{
public navItems = navItems;
public sidebarMinimized = true;
private changes: MutationObserver;
public element: HTMLElement;
constructor(@Inject(DOCUMENT) _document?: any) {

  this.changes = new MutationObserver((mutations) => {
    this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
  });
  this.element = _document.body;
  this.changes.observe(<Element>this.element, {
    attributes: true,
    attributeFilter: ['class']
  });
}

ngOnDestroy(): void {
  this.changes.disconnect();
}
}
