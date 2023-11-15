import { Component } from '@angular/core';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { RetryableBackendOperationComponent } from './assessments/retryable-backend-operation/retryable-backend-operation.component';
import { ReusableSearchComponentComponent } from './assessments/reusable-search-component/reusable-search-component.component';

@Component({
  selector: 'app-root',
  template: `<app-retryable-backend-operation></app-retryable-backend-operation>
    <app-reusable-search-component
      [facets]="facets"
    ></app-reusable-search-component> `,
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    RetryableBackendOperationComponent,
    ReusableSearchComponentComponent,
  ],
})
export class AppComponent {
  title = 'technical-assessment-angular-raul-petruta';

  facets = [
    {
      type: 'radio',
      options: ['yes', 'no', 'maybe'],
      name: 'status',
      selectedOption: 'yes',
    },
    {
      type: 'multi',
      name: 'countries',
      options: [
        { name: 'United States', selected: false },
        { name: 'Canada', selected: false },
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
      selectedValue: '25_50',
    },
  ];
}
