import { Component, OnInit } from '@angular/core';
import crowdFundContract from '../crowdFunding';
import { ethers } from 'ethers';

import { DataTransferServiceService } from '../services/data-transfer-service.service';
import * as moment from 'moment';
import { CountdownConfig, CountdownGlobalConfig } from 'ngx-countdown';


@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.css']
})
export class CampaignDetailComponent implements OnInit {
  CFContract: any;
  signer: any;
  raisedFund: any;
  description: any;
  target: any;
  minimumAmount: any;
  noOfVoters: any;
  refreshTrigger: any
  receipent: any;
  err:any;
  config1:CountdownConfig ={stopTime:0};
  config2:CountdownConfig ={stopTime:0};
  
  
  constructor(public subjectService: DataTransferServiceService) {
  }
  
  ngOnInit(): void {
    this.details();
    this.subjectService._dataStream.subscribe((res: any) => {
      // console.log(res);
      if (res == 'true') {
        this.details();
      }
    })
    
  }
  
  async details() {
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
      ) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const account = await provider.send("eth_accounts", []);
        if (account.length === 0) {
          console.log("Connect the account first");
          return;
        }
        this.signer = provider.getSigner();
        this.CFContract = crowdFundContract(provider);
        
        const CFContractWithSigner = this.CFContract.connect(this.signer);
        const raisedContributionResp = await CFContractWithSigner.raisedContribution();
        const descriptionResp = await CFContractWithSigner.description();
        const minContResp = await CFContractWithSigner.minContribution();
        const targetResp = await CFContractWithSigner.target();
        const noOfVotersResponse = await CFContractWithSigner.noOfVoters();
        const fundDeadlineResponse = await CFContractWithSigner.fundDeadline();
        const voteDeadlineResponse = await CFContractWithSigner.voteDeadline();
        const receipentResponse = await CFContractWithSigner.receipent();
        this.raisedFund = (raisedContributionResp.toString() / 10 ** 18);
        this.description = descriptionResp;
        this.minimumAmount = minContResp.toString() / 10 ** 18;
        this.target = targetResp.toString() / (10 ** 18);
        this.noOfVoters = noOfVotersResponse.toNumber();
        const fundExpTime = fundDeadlineResponse.toNumber()*1000;
        const voteExpTime = voteDeadlineResponse.toNumber()*1000;
        if (fundExpTime) {
          // this.fundDeadline = moment.unix(fundExpTime);
          // this.voteDeadline = moment.unix(voteExpTime);
          // this.config1.stopTime = fundExpTime*1000;
          
          this.config1 = {stopTime:fundExpTime};
          const bufferTime = fundExpTime - (new Date().getTime());
          setTimeout(()=>{
            this.config2 = {stopTime:voteExpTime}
          },bufferTime);
        }
        else {
          this.config1 = {stopTime:0};
          this.config2 = {stopTime:0};
        }
        this.receipent = receipentResponse;
      } catch (err: any) {
        console.log(err.message);
        this.err = err.reason;
      }
    } else {
      alert('metamask not installed.');
    }

  }



}
