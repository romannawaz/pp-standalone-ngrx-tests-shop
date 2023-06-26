import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

const Material = [MatButtonModule];

@Component({
  selector: 'layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ...Material],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {}
