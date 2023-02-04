import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-app';
  constructor(private service:AppServiceService){}

  ngOnInit(): void {
  }

  getDataFromApi(){
    this.service.getData().subscribe((response)=>{
      console.log('Response from api',response)
    },err=>{
      console.log("Error is :", err);
    })
  }
}
