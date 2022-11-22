import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataTransferServiceService {
  
 
  
    public _dataStream = new BehaviorSubject<any>('false');
    constructor() { }
  
    getDataStream(){
      return this._dataStream.asObservable();
    }
  
    putDataToStream(data:any){
      this._dataStream.next(data);
    }
}
  

