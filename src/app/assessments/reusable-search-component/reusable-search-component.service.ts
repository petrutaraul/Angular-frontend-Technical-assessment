import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReusableSearchComponentService {
  private searchTrigger = new Subject<{
    searchTerm: string;
    selectedFacets: any;
  }>();

  searchTriggered$ = this.searchTrigger.asObservable();

  triggerSearch(searchData: { searchTerm: string; selectedFacets: any }): void {
    this.searchTrigger.next(searchData);
  }
}
