import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectorOption } from './IMultiSelector';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-multi-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCheckboxModule, MatInputModule],
  template: `
    <div class="flex">
      <mat-label class="w-1/3 text-stone-300 flex self-center">{{
        facet.name
      }}</mat-label>
      <div class="flex flex-col">
        <mat-checkbox
          *ngFor="let option of facet.options"
          [(ngModel)]="option.selected"
        >
          {{ option.name }}
        </mat-checkbox>
      </div>
    </div>
  `,
})
export class MultiSelectorComponent {
  @Input() facet!: {
    name: string;
    options: MultiSelectorOption[];
  };
}
