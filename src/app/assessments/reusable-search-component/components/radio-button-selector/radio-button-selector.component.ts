import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { IEmittedFacet } from 'src/app/interfaces/IEmittedFacet';

@Component({
  selector: 'app-radio-button-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, MatRadioModule, MatInputModule],
  template: `
    <div class="flex">
      <mat-label class="w-1/3 text-stone-300 flex self-center">{{
        facet.name
      }}</mat-label>
      <mat-radio-group
        (change)="onSelectionChange()"
        [(ngModel)]="facet.selectedOption"
      >
        <mat-radio-button *ngFor="let option of facet.options" [value]="option">
          {{ option }}
        </mat-radio-button>
      </mat-radio-group>
    </div>
  `,
})
export class RadioButtonSelectorComponent {
  @Input() facet!: {
    name: string;
    options: string[];
    selectedOption: string;
  };
  @Output() selectionChanged = new EventEmitter<string>();
  @Output() facetChanged = new EventEmitter<IEmittedFacet>();

  onSelectionChange() {
    this.facetChanged.emit({
      name: this.facet.name,
      selectedOption: this.facet.selectedOption,
    });
  }
}
