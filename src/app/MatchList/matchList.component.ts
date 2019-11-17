import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { AuthService } from '../auth/auth.service'
import { AdminDashboardService } from '../dashboard/adminDashboard.service'
import { TeamMatch, TeamMatchtemp, Institute } from '../dashboard/adminDashboard.model'
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
  TeamMatchData = [];
  i = 0;
  j = 0;
  Winners : Array<String[]> = [];
  answer : Number[] = [];
  booleanCheckForWinners : Boolean[] = [];
  allInstitutes = [{points: null, inst_name: null, inst: null}];
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
            // if(Match.winner != null) {
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
                image: Match.institute1,
                ins1: Match.institute1.replace(/\s/g,''),
                ins2: Match.institute2.replace(/\s/g,''),
              }
              this.i = this.i + 1;
              
              this.Winners[this.i] = [Match.institute1, Match.institute2];
            // }
          })

          this.adminDashboardService.getInstitutes().subscribe(requests => {
            requests.Institutes.map(Institute => {
              if(Institute.points == null){
                this.allInstitutes[this.j] = {
                  inst_name : Institute.inst_name,
                  points : 0,
                  inst : Institute.inst_name.replace(/\s/g,'')
              }
            }
              else {
                this.allInstitutes[this.j] = {
                  inst_name : Institute.inst_name,
                  points : Institute.points,
                  inst : Institute.inst_name.replace(/\s/g,'')
              }
              }
              this.j = this.j + 1;
              })
            });

          this.adminDashboardService.getAllTeamMatches().subscribe(result => {
            console.log(result.value.count);
            for(this.i = 0; this.i < result.value.count; this.i = this.i + 1){
              this.answer[this.i] = this.i;
            }
          });
      })
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe()
  }
}
