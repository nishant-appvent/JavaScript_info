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
  
  constructor() { 
    this.details();
  }
  
  ngOnInit(): void {
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
        const resp = await CFContractWithSigner.getBalance();
        const resp2 = await CFContractWithSigner.getContributorsArr();
        // const resp3 = await CFContractWithSigner.minContribution();

        console.log(resp.toNumber());
        this.raisedFund = resp.toNumber();
        console.log(resp2);
        // console.log(resp3);
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
