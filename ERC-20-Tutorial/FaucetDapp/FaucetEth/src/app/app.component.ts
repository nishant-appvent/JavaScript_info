import { Component } from '@angular/core';
import { ethers, providers } from 'ethers';
import faucetContract from './faucet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  web3:any;
  fauContract:any;
  account:any;
  message:any;
  newVar=false;
  balance:any;
  signer:any;
  fcContract:any;
  withdrawlSuccess:any;
  withdrawlError:any;

  constructor(){
    this.getCurrentWalletConnected();
  }
  
  // ngOnInit(){
  //   this.changeAccount();
  // }

  async connectWallet() {
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
      ) {
      console.log("we are in");

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts",[]);
        this.signer = provider.getSigner();
        this.fcContract = faucetContract(provider);
        this.account = accounts[0];
        console.log(accounts[0]);
        this.message = 'Wallet connected';
       
      } catch (err: any) {
        console.log(err.message);
        this.message = err.message;
      }
      this.newVar = true;
    } else {
      alert('metamask not installed.');
    }

  }

  async getCurrentWalletConnected() {
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
      ){
        try{
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          this.fcContract.provider = provider;
          const accounts = await provider.send("eth_accounts",[]);
          if(accounts.length>0){
            this.signer = provider.getSigner();
            this.fcContract = faucetContract(provider);
            this.account = accounts[0];
            this.newVar = true;
            console.log(accounts[0])
          } else{
            console.log("Connect to Metamask using connect Button")
          }
        } catch(err:any){
          console.log(err.message);
        }
      }
    }

    async changeAccount() {
      if (
        typeof window !== 'undefined' &&
        typeof window.ethereum !== 'undefined'
        ) {
          window.ethereum.on("accountsChanged",(accounts:any)=>{
            this.account = accounts[0];
            console.log(this.account);
            console.log("here");
          })
          this.newVar = true;
      } else {
        this.account = "";
        this.newVar = false;
        alert('metamask not installed.');
      }
  
    }
    
    async getMYHandler(){
      try{
        const fcContractWithSigner = this.fcContract.connect(this.signer);
        const resp = await fcContractWithSigner.requestTokens();
        console.log(resp);
        this.withdrawlSuccess = "50 tokens sent";
        

      }catch(err:any){
        console.log(err.message);
        this.withdrawlError = "Some Error Occured"
      }
    }



}
