import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  activeTab: string = 'active';

  isActive(tab: string): boolean {
    return this.activeTab === tab;
  }

  setActive(tab: string): void {
    this.activeTab = tab;
  }
}
