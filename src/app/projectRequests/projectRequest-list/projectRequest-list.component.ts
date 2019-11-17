import { Component, OnInit, OnDestroy } from '@angular/core'
import { PageEvent } from '@angular/material'
import { Subscription } from 'rxjs'

import { ProjectRequest } from '../projectRequest.model'
import { ProjectRequestsService } from '../projectRequests.service'
import { AuthService } from '../../auth/auth.service'
import { AdminDashboardService } from 'src/app/dashboard/adminDashboard.service'
import { Sport, Institute} from 'src/app/dashboard/adminDashboard.model'

@Component({
  selector: 'app-project-request-list',
  templateUrl: './projectRequest-list.component.html',
  styleUrls: ['./projectRequest-list.component.css']
})
export class ProjectRequestListComponent implements OnInit, OnDestroy {
  userType = 'customer'
  projectRequests: ProjectRequest[] = []
  allInstitutes: Institute[] = []
  allSports: Sport[] = [];
  isLoading = false
  totalProjectRequests = 0
  projectRequestsPerPage = 2
  currentPage = 1
  pageSizeOptions = [1, 2, 5, 10]
  userIsAuthenticated = false
  userId: string
  private authStatusSub: Subscription
  private userTypeStatusSub: Subscription

  constructor(
    public projectRequestsService: ProjectRequestsService,
    private authService: AuthService,
    private adminDashbaordService: AdminDashboardService
  ) {}

  ngOnInit() {
    this.isLoading = true
    this.userId = this.authService.getUserId()
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
        this.userId = this.authService.getUserId()
      })
    this.userType = this.authService.getUserType()
    this.userTypeStatusSub = this.authService
    .getUserTypeStatusListener()
    .subscribe(listener => {
      this.userType = this.authService.getUserType()
    })
    if (this.userType === 'admin') {
      this.projectRequestsService.getProjectRequests().subscribe(requests => {
        this.projectRequests = requests.ProjectRequests
        this.isLoading = false
      })
    } else if (this.userType === 'developer') {
      console.log('developer', this.userType)
    } else if (this.userType === 'projectManager') {
      this.projectRequestsService.getProjectRequests().subscribe(requests => {
        this.projectRequests = requests.ProjectRequests
        this.isLoading = false
      })
    } else {
      this.isLoading = false
    }

    this.adminDashbaordService.getSports().subscribe(requests => {
      this.allSports = requests.Sports;
      this.isLoading = false
    });
    this.adminDashbaordService.getInstitutes().subscribe(requests => {
      this.allInstitutes = requests.Institutes;
      this.isLoading = false
    });

  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe()
    this.userTypeStatusSub.unsubscribe()
  }
}
