import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import crowdFundContract from '../crowdFunding';
import { DataTransferServiceService } from '../services/data-transfer-service.service';
import { NgxUiLoaderService } from "ngx-ui-loader"; 


@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.css'],
})
export class ContributorComponent implements OnInit {
  constructor(public subjectService:DataTransferServiceService, public _loader:NgxUiLoaderService) { }
  signer: any;
  CFContract: any;
  err:any;
  ngOnInit(): void { }

  async sendEther(val: any) {
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.CFContract = crowdFundContract(provider);
    const CFContractWithSigner = this.CFContract.connect(this.signer);
    const sendEthResponse = await CFContractWithSigner.sendEther({
      value: ethers.utils.parseEther(val),
    });
    console.log(sendEthResponse);
    this._loader.start();
    console.log(await sendEthResponse.wait());
    this._loader.stop();
  }
    catch(err:any){
      this.err = err.reason;
      console.log(err);
      
    } finally {
    this.subjectService.putDataToStream('true');}
  }

  async vote() {
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.CFContract = crowdFundContract(provider);
    const CFContractWithSigner = this.CFContract.connect(this.signer);
    const voteResponse = await CFContractWithSigner.voteRequest();
    console.log(voteResponse);
    this._loader.start();
    const voteFinalResponse = await voteResponse.wait();
    this._loader.stop();
    console.log(voteFinalResponse);
  } catch(err:any){
    console.log(err.message);
    this.err = err.reason;
  } finally{
    this.subjectService.putDataToStream('true');}
  }

  
}
