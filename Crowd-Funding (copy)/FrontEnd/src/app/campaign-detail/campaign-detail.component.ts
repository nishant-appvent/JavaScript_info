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
  CFContract: any;
  signer: any;
  raisedFund: any;
  description: any;
  target: any;
  fundDeadline: any;
  voteDeadline: any;
  minimumAmount: any;
  noOfVoters: any;
  random: any;
  refreshTrigger: any
  receipent: any;
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
        
        // console.log(provider);
        // console.log(this.signer);
        // console.log("we are in");
        // console.log(this.CFContract);
        // console.log(CFContractWithSigner);

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
        const fundExpTime = fundDeadlineResponse.toNumber();
        const voteExpTime = voteDeadlineResponse.toNumber();
        if (fundExpTime) {
          this.fundDeadline = moment.unix(fundExpTime);
          this.voteDeadline = moment.unix(voteExpTime);
        }
        else {
          this.fundDeadline = "";
          this.voteDeadline = "";
        }
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
