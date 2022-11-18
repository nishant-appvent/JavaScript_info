import { Component } from '@angular/core';
import Web3 from 'web3';
import faucetContract from './faucet';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FaucetDapp';
  web3:any;
  fauContract:any;
  account:any;
  message:any;
  newVar=false;
  balance:any;

  constructor(){

  }

  async connectWallet() {
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
      ) {
      console.log("we are in");

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.web3 = new Web3(window.ethereum);
        const accounts = await this.web3.eth.getAccounts();
        this.fauContract = faucetContract(this.web3);
        this.account = accounts[0];
        this.message = 'Wallet connected';
       
      } catch (err: any) {
        // console.log(err.message);
        this.message = err.message;
      }
      this.newVar = true;
    } else {
      alert('metamask not installed.');
    }
  }

  async getBalance(){
    this.balance = await this.fauContract.methods.getBalance().call(); 
  }

  async sendMeFaucetToken(){
    const a = await this.fauContract.methods.requestTokens().send({
      from: this.account
    });
    console.log();
    console.log(a);
  }


}
