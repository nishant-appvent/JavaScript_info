import { Component, OnInit } from '@angular/core';
import crowdFundContract from '../crowdFunding';
import { ethers } from 'ethers';


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
  
  constructor() { 
  }
  
  ngOnInit(): void {
    this.details();
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

        this.raisedFund = raisedContributionResp.toNumber();
        console.log(this.raisedFund);
        this.description = descriptionResp;
        console.log(descriptionResp);
        this.minimumAmount = minContResp.toNumber()/10**18;
        console.log(this.minimumAmount);
        this.target = targetResp/(10**18);
        this.noOfVoters = noOfVotersResponse.toNumber();
        console.log(noOfVotersResponse);
        console.log(deadlineResponse.toNumber());

        let milliseconds = deadlineResponse.toNumber();
        // let milliseconds = Date.now();
        console.log(milliseconds);
        let myDate = new Date( milliseconds);

        // using various methods of Date class to get year, date, month, hours, minutes, and seconds.

        this.deadline = myDate.toLocaleString();
        
        // const today = new Date(deadlineResponse.toNumber());
        // this.deadline = today.toDateString();
        console.log(this.deadline);
        // this.account = accounts[0];
        // console.log(accounts[0]);
        // this.message = 'Wallet connected';
       
      } catch (err: any) {
        console.log(err.message);
      }
    } else {
      alert('metamask not installed.');
    }

  }



}
