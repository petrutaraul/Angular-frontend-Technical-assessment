import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectorComponent } from './components/multi-selector/multi-selector.component';
import { ValueSelectorComponent } from './components/value-selector/value-selector.component';
import { RadioButtonSelectorComponent } from './components/radio-button-selector/radio-button-selector.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReusableSearchComponentService } from './reusable-search-component.service';

@Component({
  selector: 'app-reusable-search-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MultiSelectorComponent,
    ValueSelectorComponent,
    RadioButtonSelectorComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './reusable-search-component.component.html',
})
export class ReusableSearchComponentComponent {
  constructor(private searchService: ReusableSearchComponentService) {}

  @Input() minLength: number = 2;
  @Input() maxLength: number = 20;
  @Input() searchPlaceholder: string = 'Search';
  @Input() facets: any[] = [];

  searchTerm: string = '';
  selectedFacets: any = {};

  onFacetChange(facetName: string, selectedOption: any) {
    console.log(facetName, selectedOption);

    this.selectedFacets[facetName] = selectedOption;
  }

  performSearch(): void {
    if (this.searchTerm.length >= this.minLength) {
      this.searchService.triggerSearch({
        searchTerm: this.searchTerm,
        selectedFacets: this.selectedFacets,
      });
    }
  }
}
