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
  receipent:any;
  constructor(public subjectService:DataTransferServiceService) { 
  }
  
  ngOnInit(): void {
    this.details();
    this.subjectService._dataStream.subscribe((res:any)=>{
      // console.log(res);
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
      // console.log("we are in");
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const account = await provider.send("eth_accounts",[]);
        if(account.length===0){
          console.log("Connect the account first");
          return ;
        }
        // console.log(provider);
        this.signer = provider.getSigner();
        // console.log(this.signer);
        this.CFContract = crowdFundContract(provider);

        // console.log(this.CFContract);
        
        const CFContractWithSigner = this.CFContract.connect(this.signer) ;
        // console.log(CFContractWithSigner);
        const raisedContributionResp = await CFContractWithSigner.raisedContribution();
        this.raisedFund = (raisedContributionResp.toString()/10**18);
        const descriptionResp = await CFContractWithSigner.description();
        this.description = descriptionResp;
        const minContResp = await CFContractWithSigner.minContribution();
        this.minimumAmount = minContResp.toString()/10**18;
        const targetResp = await CFContractWithSigner.target();
        this.target = targetResp/(10**18);
        const noOfVotersResponse = await CFContractWithSigner.noOfVoters();
        this.noOfVoters = noOfVotersResponse.toNumber();
        const deadlineResponse = await CFContractWithSigner.deadline();
        const expTime = deadlineResponse.toNumber();
        if(expTime){
        this.deadline = moment.unix(expTime);}
        else{
          this.deadline = "";
        }
        const receipentResponse = await CFContractWithSigner.receipent();
        this.receipent = receipentResponse;
        this.random = Math.random();
      } catch (err: any) {
        console.log(err.message);
      }
    } else {
      alert('metamask not installed.');
    }

  }



}
