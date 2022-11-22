import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
import { CampaignSetterComponent } from './campaign-setter/campaign-setter.component';
import { ConnectComponent } from './connect/connect.component';
import { ContributorComponent } from './contributor/contributor.component';

const routes: Routes = [
  {path:'',component:ConnectComponent},
  {path:'details',component:CampaignDetailComponent},
  {path:'admin',component:AdminComponent},
  {path:'contributor',component:ContributorComponent},
  {path:'admin/campaignSetter',component:CampaignSetterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
