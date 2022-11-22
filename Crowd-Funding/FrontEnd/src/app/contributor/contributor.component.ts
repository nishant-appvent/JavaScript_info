import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ethers } from 'ethers';
import crowdFundContract from '../crowdFunding';
import { DataTransferServiceService } from '../services/data-transfer-service.service';

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.css'],
})
export class ContributorComponent implements OnInit {
  constructor(public subjectService:DataTransferServiceService) { }
  signer: any;
  CFContract: any;
  ngOnInit(): void { }

  async sendEther(val: any) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.CFContract = crowdFundContract(provider);
    const CFContractWithSigner = this.CFContract.connect(this.signer);
    // const value = BigInt(val*)).toString();
    const sendEthResponse = await CFContractWithSigner.sendEther({
      value: ethers.utils.parseEther(val),
    });
    console.log(sendEthResponse);
    console.log(await sendEthResponse.wait());
    this.subjectService.putDataToStream('true');
  }

  async vote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.CFContract = crowdFundContract(provider);
    const CFContractWithSigner = this.CFContract.connect(this.signer);
    // const value = BigInt(val*)).toString();
    const voteResponse = await CFContractWithSigner.voteRequest();
    console.log(voteResponse);
    const voteFinalResponse = await voteResponse.wait();
    console.log(voteFinalResponse);
    this.subjectService.putDataToStream('true');
  }

  
}
