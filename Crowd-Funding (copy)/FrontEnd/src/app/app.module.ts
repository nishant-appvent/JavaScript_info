import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
import { AdminComponent } from './admin/admin.component';
import { ContributorComponent } from './contributor/contributor.component';
import { CampaignSetterComponent } from './campaign-setter/campaign-setter.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { ConnectComponent } from './connect/connect.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader'
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CampaignDetailComponent,
    AdminComponent,
    ContributorComponent,
    CampaignSetterComponent,
    ConnectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    CountdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
