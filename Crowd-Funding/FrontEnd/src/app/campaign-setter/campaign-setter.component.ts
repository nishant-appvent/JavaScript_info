import { Component, OnInit } from '@angular/core';
import { DataTransferServiceService } from '../services/data-transfer-service.service';
import crowdFundContract from '../crowdFunding';
import { ethers } from 'ethers';


@Component({
  selector: 'app-campaign-setter',
  templateUrl: './campaign-setter.component.html',
  styleUrls: ['./campaign-setter.component.css']
})
export class CampaignSetterComponent implements OnInit {

  account:any;
  signer:any;
  CFContract:any;

  constructor(private subjectService:DataTransferServiceService) {
    
   }
  ngOnInit(): void {
  }

  async createCampaign(obj:any){
    const deadline = obj.deadline;
    const target = BigInt(obj.target*(10**18));
    const receipent = obj.receipent;
    const description = obj.description;
    // console.log(obj.deadline);
    // console.log(obj.target);
    // console.log(obj.receipent);
    // console.log(obj.description);
    // console.log(obj);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.CFContract = crowdFundContract(provider);
    const CFContractWithSigner = this.CFContract.connect(this.signer) ;
    const setContractResp = await CFContractWithSigner.contractSetter(target, deadline, receipent, description);
    console.log(setContractResp);
    const setContractFinalResp = await setContractResp.wait();
    console.log(setContractFinalResp);
    this.subjectService.putDataToStream('true');
  }

}
