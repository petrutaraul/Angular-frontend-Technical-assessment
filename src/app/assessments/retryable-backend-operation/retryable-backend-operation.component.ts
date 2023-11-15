import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetryableBackendServiceService } from 'src/app/services/retryable-backend-service.service';
import { Observable, filter, pipe, take } from 'rxjs';
import { IBackendResponse } from 'src/app/interfaces/IBackendResponse';

@Component({
  selector: 'app-retryable-backend-operation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './retryable-backend-operation.component.html',
  styleUrls: ['./retryable-backend-operation.component.scss'],
})
export class RetryableBackendOperationComponent implements OnInit {
  data$!: Observable<IBackendResponse>;

  constructor(private backendService: RetryableBackendServiceService) {}

  ngOnInit(): void {
    this.data$ = this.backendService.fetchData().pipe(take(1));
  }
}
