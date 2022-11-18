import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-setter',
  templateUrl: './campaign-setter.component.html',
  styleUrls: ['./campaign-setter.component.css']
})
export class CampaignSetterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  createCampaign(obj:any){
    console.log(obj.deadline);
    console.log(obj.target);
    console.log(obj.receipent);
    console.log(obj.description);
    console.log(obj);
  }

}
