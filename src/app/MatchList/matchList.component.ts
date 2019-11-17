import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { AuthService } from '../auth/auth.service'
import { AdminDashboardService } from '../dashboard/adminDashboard.service'
import { TeamMatch, TeamMatchtemp } from '../dashboard/adminDashboard.model'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-matchList',
  templateUrl: './matchList.component.html',
  styleUrls: ['./matchList.component.css']
})
export class MatchListComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false
  private authListenerSubs: Subscription
  private userTypeStatusSub: Subscription
  userType = 'customer'
  TeamMatchData: TeamMatchtemp[] = [];
  i = 0;
  Winners : Array<String[]> = [];
  answer : Number[] = [];
  institute1;
  institute2;
  constructor(private authService: AuthService,
    private adminDashboardService: AdminDashboardService,
    private sanitizer: DomSanitizer) {}

    public getSantizeUrl(image : string) {
      return this.sanitizer.bypassSecurityTrustStyle('url(${image})');
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      })
      this.adminDashboardService.getTeamMatches().subscribe(teamMatchData => {
        teamMatchData.TeamMatches.map(Match => {
            console.log(Match)
            this.TeamMatchData[this.i] = {
              match_id: Match.match_id,
              institute1 : Match.institute1,
              institute2 : Match.institute2,
              sport_name : Match.sport_name,
              group_name : Match.group_name,
              venue_name: Match.venue_name,
              date: Match.date,
              referee_id: Match.referee_id,
              winner: Match.winner,
              image: Match.institute1
            }
            this.Winners[this.i] = [Match.institute1, Match.institute2];

            this.i = this.i + 1;
          })

          this.adminDashboardService.getAllTeamMatches().subscribe(result => {
            console.log(result.value.count);
            for(this.i = 0; this.i < result.value.count; this.i = this.i + 1){
              this.answer[this.i] = this.i;
            }
          })
      })
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe()
  }
}
