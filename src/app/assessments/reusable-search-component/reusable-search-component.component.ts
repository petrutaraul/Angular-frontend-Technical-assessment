import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { MultiSelectorOption } from './components/multi-selector/IMultiSelector';

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
export class ReusableSearchComponentComponent implements OnInit {
  constructor(private searchService: ReusableSearchComponentService) {}

  @Input() minLength: number = 2;
  @Input() maxLength: number = 20;
  @Input() searchPlaceholder: string = 'Search';
  @Input() facets: any[] = [];

  searchTerm: string = '';
  selectedFacets: any = {};

  ngOnInit() {
    this.facets.forEach((facet) => {
      if (facet.type === 'radio' || facet.type === 'value') {
        this.selectedFacets[facet.name] =
          facet.selectedOption || facet.selectedValue;
      } else if (facet.type === 'multi') {
        this.selectedFacets[facet.name] = facet.options
          .filter((option: MultiSelectorOption) => option.selected)
          .map((option: MultiSelectorOption) => option.name);
      }
    });
  }

  onFacetChange(facetName: string, selectedOption: any) {
    console.log(facetName, selectedOption);

    this.selectedFacets[facetName] = selectedOption;
  }

  performSearch(): void {
    this.facets.forEach((facet) => {
      if (!(facet.name in this.selectedFacets)) {
        if (facet.type === 'radio' || facet.type === 'value') {
          this.selectedFacets[facet.name] =
            facet.selectedOption || facet.selectedValue;
        } else if (facet.type === 'multi') {
          this.selectedFacets[facet.name] = facet.options
            .filter((option: MultiSelectorOption) => option.selected)
            .map((option: MultiSelectorOption) => option.name);
        }
      }
    });

    if (this.searchTerm.length >= this.minLength) {
      this.searchService.triggerSearch({
        searchTerm: this.searchTerm,
        selectedFacets: this.selectedFacets,
      });
    }
  }
}
