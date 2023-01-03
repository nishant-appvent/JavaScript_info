import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ethers } from 'ethers';
import crowdFundContract from '../crowdFunding';
import { DataTransferServiceService } from '../services/data-transfer-service.service';
import { NgxUiLoaderService } from "ngx-ui-loader"; 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  signer: any;
  CFContract: any;
  arr: any = [];
  err:any;

  constructor(private router: Router, public subjectService: DataTransferServiceService, public _loader:NgxUiLoaderService) { }

  ngOnInit(): void {
  }

  setCampaign() {
    this.subjectService.putDataToStream('true');
    this.router.navigate(['./admin/campaignSetter']);
  }

  async refund() {
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.CFContract = crowdFundContract(provider);
    const CFContractWithSigner = this.CFContract.connect(this.signer);
    const refundResponse = await CFContractWithSigner.adminRefund();
    console.log(refundResponse);
    this._loader.start();
    const refundFinalResponse = await refundResponse.wait();
    this._loader.stop();
    console.log(refundFinalResponse);
    this.arr = [];
  }
  catch(err:any){
    console.log(err.reason);
    this.err = err.reason;
  } finally{
      this.subjectService.putDataToStream('true');
    }
  }
  imgpath!:string;
  async makePayment() {
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.CFContract = crowdFundContract(provider);
    const CFContractWithSigner = this.CFContract.connect(this.signer);
    const makePaymentResponse = await CFContractWithSigner.makePayment();
    console.log(makePaymentResponse);
    this._loader.start();
    const makePaymentFinalResponse = await makePaymentResponse.wait();
    this._loader.stop();
    console.log(makePaymentFinalResponse);
    this.arr = []
    this.subjectService.putDataToStream('true');}
    catch(err:any){
      console.log(err.message);
      this.err = err.reason;
    } finally{
      this.subjectService.putDataToStream('true');
    }
  }

  async contributorsArr() {
    try{
    this._loader.start();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.CFContract = crowdFundContract(provider);
    const CFContractWithSigner = this.CFContract.connect(this.signer);
    const contriResponse = await CFContractWithSigner.getContributorsArr();
    console.log(contriResponse);
    let locArr=[];
    for (let i = 0; i < contriResponse.length; i++) {
      const amount = await this.contributorsMap(contriResponse[i]);
      const val = {address : contriResponse[i], donation : amount / 10 ** 18};
      locArr.push(val);
    }
    this._loader.stop();
    if(locArr.length==0){
      this.err = 'No Contributors yet.';
    } else{
    this.arr = locArr;
  }
  }
    catch(err:any){
      console.log(err);
      this.err = err.reason;
    } finally{
      this.subjectService.putDataToStream('true');
    }
  }

  async contributorsMap(address: any) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.CFContract = crowdFundContract(provider);
    const CFContractWithSigner = this.CFContract.connect(this.signer);
    const contriResponse = await CFContractWithSigner.contributors(address);
    // console.log(contriResponse);
    return contriResponse.toString()
  }

 
}
