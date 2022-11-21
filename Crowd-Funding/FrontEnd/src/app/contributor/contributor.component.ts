import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import crowdFundContract from '../crowdFunding';

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.css']
})
export class ContributorComponent implements OnInit {

  constructor() { }
  signer:any;
  CFContract:any;
  ngOnInit(): void {
  }
  async sendEther(val:any) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = provider.getSigner();
        this.CFContract = crowdFundContract(provider);
        const CFContractWithSigner = this.CFContract.connect(this.signer) ;
        // const value = BigInt(val*)).toString();
        const sendEthResponse=await CFContractWithSigner.sendEther({value: ethers.utils.parseEther(val)});
        console.log(sendEthResponse.toNumber());
  }

  async vote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = provider.getSigner();
        this.CFContract = crowdFundContract(provider);
        const CFContractWithSigner = this.CFContract.connect(this.signer) ;
        // const value = BigInt(val*)).toString();
        const voteResponse=await CFContractWithSigner.voteRequest();
        console.log(voteResponse.toNumber());
  }


}
