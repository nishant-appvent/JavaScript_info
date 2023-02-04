import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartQuantity =0;

  constructor(cartService: CartService) { 
    cartService.getCartObervable().subscribe((newCart)=>{
      this.cartQuantity = newCart.totalCount;
    })
  }

  ngOnInit(): void {
  }

}
