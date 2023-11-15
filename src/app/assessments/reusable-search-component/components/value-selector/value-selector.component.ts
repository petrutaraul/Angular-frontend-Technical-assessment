import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValueSelectorOption } from './IValueSelector';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-value-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  template: `
    <div class="flex">
      <mat-label
        class="w-1/3 text-stone-300 flex self-center relative bottom-2"
        >{{ facet.name }}</mat-label
      >
      <mat-form-field appearance="outline">
        <mat-label>{{ facet.name }}</mat-label>
        <mat-select [(ngModel)]="facet.selectedValue" [name]="facet.name">
          <mat-option *ngFor="let value of facet.values" [value]="value.value">
            {{ value.label }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
})
export class ValueSelectorComponent {
  @Input() facet!: {
    name: string;
    values: ValueSelectorOption[];
    selectedValue: string;
  };
}
