import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-pane',
  templateUrl: './navigation-pane.component.html',
  styleUrls: ['./navigation-pane.component.scss'],
})
export class NavigationPaneComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('Navigation Pane Component');
  }
}
