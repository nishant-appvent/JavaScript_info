import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';


@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})

export class ConnectComponent implements OnInit {

  account:any;
  message:any;
  signer:any;
  status="Connect Wallet";

  constructor(private cdRef: ChangeDetectorRef){
     this.getCurrentWalletConnected();
  }

  ngOnInit(): void {
      
  }

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

        this.account = accounts[0];
        this.status = "Connected : " + this.account;
        this.message = 'Wallet connected';
        
      } catch (err: any) {
        console.log(err.message);
        this.message = err.message;
      } 
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
          const accounts = await provider.send("eth_accounts",[]);
          if(accounts.length>0){
            this.signer = provider.getSigner();
            // this.fcContract = faucetContract(provider);
            this.account = accounts[0];
            if(this.account!==undefined){
              this.status = "Connected : " + this.account;}
            else{
              this.status = "Connect";
            }
            window.ethereum.on("accountsChanged",(accounts:any)=>{

              this.account = accounts[0];
              if(this.account!==undefined){
                this.status = "Connected : " + this.account;}
              else{
                this.status = "Connect";
              }
              console.log(this.status);
                
                console.log(this.account);
                console.log("here dsafalsdkf");
                this.cdRef.detectChanges();
              })
          } else{
            console.log("Connect to Metamask using connect Button")
          }
        } catch(err:any){
          console.log(err.message);
        }
      }
    }

}
