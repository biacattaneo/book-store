import { Component } from '@angular/core';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

const BURGUER_MENU_ICON =
  `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 18L20 18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"></path> <path d="M4 12L20 12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"></path> <path d="M4 6L20 6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"></path> </g></svg>
`;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('burguer-menu', sanitizer.bypassSecurityTrustHtml(BURGUER_MENU_ICON));
  }
}
