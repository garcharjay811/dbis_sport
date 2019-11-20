import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { PageEvent } from '@angular/material'
import { CountdownComponent } from 'ngx-countdown';
import { Subscription } from 'rxjs'

import { ProjectRequest } from '../projectRequest.model'
import { ProjectRequestsService } from '../projectRequests.service'
import { AuthService } from '../../auth/auth.service'
import { AdminDashboardService } from 'src/app/dashboard/adminDashboard.service'
import { Sport, Institute, TeamMatch} from 'src/app/dashboard/adminDashboard.model'

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
  endDate: Date;
  upcomingTeamMatch;
  private authStatusSub: Subscription
  private userTypeStatusSub: Subscription;
  static x : boolean = true;
  cureentTimeStamp : number =  Date.now();
  @ViewChild('countdown',{static: false}) counter: CountdownComponent;

  constructor(
    public projectRequestsService: ProjectRequestsService,
    private authService: AuthService,
    private adminDashbaordService: AdminDashboardService
  ) {}

  finishTest() {
    console.log("count down", this.counter);
    this.counter.restart();
  }

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

    this.adminDashbaordService.getUpcomingTeamMatches().subscribe(requests => {
      console.log(requests.UpcomingTeamMatches);
      this.upcomingTeamMatch = {
        institute1 : requests.UpcomingTeamMatches[0].institute1,
        institute2 : requests.UpcomingTeamMatches[0].institute2,
        match_id : requests.UpcomingTeamMatches[0].match_id,
        sport_name : requests.UpcomingTeamMatches[0].sport_name,
        group_name : requests.UpcomingTeamMatches[0].group_name,
        venue_name : requests.UpcomingTeamMatches[0].venue_name,
        date: requests.UpcomingTeamMatches[0].date,
        referee_id : requests.UpcomingTeamMatches[0].referee_id,
        winner : requests.UpcomingTeamMatches[0].winner,
        ins1 : requests.UpcomingTeamMatches[0].institute1.replace(/\s/g,''),
        ins2 : requests.UpcomingTeamMatches[0].institute2.replace(/\s/g,'')
      }
      console.log(this.upcomingTeamMatch.ins2);
      var temp :number = this.upcomingTeamMatch.date;
      this.cureentTimeStamp = temp - this.cureentTimeStamp;
      console.log(this.cureentTimeStamp);
    })

  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe()
    this.userTypeStatusSub.unsubscribe()
  }

}
