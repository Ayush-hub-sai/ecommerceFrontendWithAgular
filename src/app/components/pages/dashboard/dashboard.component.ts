import { Component } from '@angular/core';

import { MaterialModule } from '../../../core/shared/material/material.module';
import { DashboardService } from '../../../core/services/pagesService/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dashboardData: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData() {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        console.log('Dashboard data fetched successfully:', data);
      },
      error: (err) => {
        console.error('Error fetching dashboard data', err);
      },
      complete: () => {
        console.log('Fetching dashboard data completed');
      },
    });
  }

}
