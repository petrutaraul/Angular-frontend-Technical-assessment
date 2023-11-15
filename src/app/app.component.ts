import { Component, OnDestroy } from '@angular/core';
import {
  NgSwitch,
  NgSwitchDefault,
  NgSwitchCase,
  JsonPipe,
} from '@angular/common';
import { RetryableBackendOperationComponent } from './assessments/retryable-backend-operation/retryable-backend-operation.component';
import { ReusableSearchComponentComponent } from './assessments/reusable-search-component/reusable-search-component.component';
import { Subject, takeUntil } from 'rxjs';
import { ReusableSearchComponentService } from './assessments/reusable-search-component/reusable-search-component.service';
import { IFacetGroup } from './interfaces/IFacetGroup';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    JsonPipe,
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    RetryableBackendOperationComponent,
    ReusableSearchComponentComponent,
  ],
})
export class AppComponent implements OnDestroy {
  title = 'technical-assessment-angular-raul-petruta';

  private destroy$ = new Subject<void>();

  selectedFacetsWithRadioData: IFacetGroup = {
    searchTerm: '',
    selectedOptions: {},
  };
  selectedFacetsWithMultiAndSelectData: IFacetGroup = {
    searchTerm: '',
    selectedOptions: {},
  };

  constructor(private searchService: ReusableSearchComponentService) {
    this.searchService.searchTriggered$
      .pipe(takeUntil(this.destroy$))
      .subscribe((searchData) => {
        this.handleSearch(searchData);
      });
  }

  handleSearch(searchData: { searchTerm: string; selectedFacets: any }): void {
    this.selectedFacetsWithMultiAndSelectData = {
      searchTerm: '',
      selectedOptions: {},
    };
    this.selectedFacetsWithRadioData = { searchTerm: '', selectedOptions: {} };

    for (const facetName in searchData.selectedFacets) {
      if (searchData.selectedFacets.hasOwnProperty(facetName)) {
        const facetType = this.getFacetType(facetName);
        if (facetType === 'radio') {
          this.selectedFacetsWithRadioData.selectedOptions =
            searchData.selectedFacets;
          this.selectedFacetsWithRadioData.searchTerm = searchData.searchTerm;
        } else if (facetType === 'multi' || facetType === 'value') {
          this.selectedFacetsWithMultiAndSelectData.selectedOptions =
            searchData.selectedFacets;
          this.selectedFacetsWithMultiAndSelectData.searchTerm =
            searchData.searchTerm;
        }
      }
    }
  }

  // Helper method to determine the type of a facet based on its name
  private getFacetType(facetName: string): string | undefined {
    const combinedFacets = [
      ...this.facetsWithRadio,
      ...this.facetsWithMultiAndSelect,
    ];
    const facet = combinedFacets.find((f) => f.name === facetName);
    return facet?.type;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  facetsWithMultiAndSelect = [
    {
      type: 'multi',
      name: 'countries',
      options: [
        { name: 'United States', selected: false },
        { name: 'Canada', selected: true },
        { name: 'Mexico', selected: false },
      ],
    },
    {
      type: 'value',
      name: 'priceRange',
      values: [
        { label: 'Under $25', value: 'under_25' },
        { label: '$25 to $50', value: '25_50' },
        { label: 'Over $50', value: 'over_50' },
      ],
      selectedValue: '',
    },
  ];

  facetsWithRadio = [
    {
      type: 'radio',
      options: ['yes', 'no', 'maybe'],
      name: 'status',
      selectedOption: 'yes',
    },
  ];
}
