import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ethers } from 'ethers';
import crowdFundContract from '../crowdFunding';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  signer:any;
  CFContract:any;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  setCampaign(){
    this.router.navigate(['./admin/campaignSetter']);
  }

  async refund() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = provider.getSigner();
        this.CFContract = crowdFundContract(provider);
        const CFContractWithSigner = this.CFContract.connect(this.signer) ;
        const refundResponse=await CFContractWithSigner.adminRefund();
        console.log(refundResponse);
  }

  async makePayment() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = provider.getSigner();
        this.CFContract = crowdFundContract(provider);
        const CFContractWithSigner = this.CFContract.connect(this.signer) ;
        const makePaymentResponse=await CFContractWithSigner.makePayment();
        console.log(makePaymentResponse);
  }

  async contributorsArr() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = provider.getSigner();
        this.CFContract = crowdFundContract(provider);
        const CFContractWithSigner = this.CFContract.connect(this.signer) ;
        const contriResponse=await CFContractWithSigner.getContributorsArr();
        console.log(contriResponse);
  }

  




}