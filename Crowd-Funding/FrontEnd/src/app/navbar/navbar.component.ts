import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferServiceService } from '../services/data-transfer-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,private subjectService:DataTransferServiceService) { }

  ngOnInit(): void {
  }

  adminPage(){
    this.subjectService.putDataToStream('true');
    this.router.navigate(['./admin']);
  }

  contributorPage(){
    this.subjectService.putDataToStream('true');
    this.router.navigate(['./contributor']);
  }

}
