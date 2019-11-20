import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { ProjectRequestCreateComponent } from './projectRequest-create/projectRequest-create.component'
import { ProjectRequestListComponent } from './projectRequest-list/projectRequest-list.component'
import { AngularMaterialModule } from '../angular-material.module'
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [ProjectRequestCreateComponent, ProjectRequestListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    CountdownModule
  ]
})
export class ProjectRequestsModule {}
