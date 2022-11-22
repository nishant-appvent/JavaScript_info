import { Component, OnInit } from '@angular/core';
import crowdFundContract from '../crowdFunding';
import { ethers } from 'ethers';
import * as moment from 'moment';
import { DataTransferServiceService } from '../services/data-transfer-service.service';


@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.css']
})
export class CampaignDetailComponent implements OnInit {
  CFContract:any;
  signer:any;
  raisedFund:any;
  description:any;
  target:any;
  deadline:any;
  minimumAmount:any;
  noOfVoters:any;
  random:any;
  refreshTrigger:any
  constructor(public subjectService:DataTransferServiceService) { 
  }
  
  ngOnInit(): void {
    this.details();
    this.subjectService._dataStream.subscribe((res:any)=>{
      console.log(res);
      if(res=='true'){
        this.details();
      }
    })
    
  }

  async details(){
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
      ) {
      console.log("we are in");
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = provider.getSigner();
        this.CFContract = crowdFundContract(provider);
        const CFContractWithSigner = this.CFContract.connect(this.signer) ;
        const raisedContributionResp = await CFContractWithSigner.raisedContribution();
        const descriptionResp = await CFContractWithSigner.description();
        const minContResp = await CFContractWithSigner.minContribution();
        const targetResp = await CFContractWithSigner.target();
        const noOfVotersResponse = await CFContractWithSigner.noOfVoters();
        const deadlineResponse = await CFContractWithSigner.deadline();

        this.raisedFund = raisedContributionResp.toNumber()/10**18;
        // console.log(this.raisedFund);
        this.description = descriptionResp;
        // console.log(descriptionResp);
        this.minimumAmount = minContResp.toNumber()/10**18;
        // console.log(this.minimumAmount);
        this.target = targetResp/(10**18);
        this.noOfVoters = noOfVotersResponse.toNumber();
        // console.log(this.noOfVoters);
        // console.log(deadlineResponse);
        // console.log(deadlineResponse.toNumber());
        const expTime = deadlineResponse.toNumber();
        if(expTime){
        this.deadline = moment.unix(expTime);}
        else{
          this.deadline = "";
        }
        this.random = Math.random();

       
      } catch (err: any) {
        console.log(err.message);
      }
    } else {
      alert('metamask not installed.');
    }

  }



}
