import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { AppRoutingModule } from './app-routing.module'
import { AuthInterceptor } from './auth/auth-interceptor'
import { ErrorInterceptor } from './error-interceptor'
import { ErrorComponent } from './error/error.component'
import { AngularMaterialModule } from './angular-material.module'
import { AboutComponent } from './about/about.component'
import { FooterComponent } from './footer/footer.component'
import { adminDashboardComponent } from "./dashboard/adminDashboard.component";
import { MatSelectModule, MatOptionModule } from '@angular/material'
import { ReactiveFormsModule } from '@angular/forms'
import { ProjectRequestListComponent } from './projectRequests/projectRequest-list/projectRequest-list.component'
import { ProjectRequestCreateComponent } from './projectRequests/projectRequest-create/projectRequest-create.component'
import { MatchListComponent } from './MatchList/matchList.component'
import { CountdownModule } from 'ngx-countdown';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    AboutComponent,
    FooterComponent,
    adminDashboardComponent,
    ProjectRequestListComponent,
    ProjectRequestCreateComponent,
    MatchListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatSelectModule,
    CountdownModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
