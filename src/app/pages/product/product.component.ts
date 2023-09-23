import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any = [];

  constructor(private _US: UserService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this._US.getProductList().subscribe(
      (data: any) => {
        if (data.meta.status) {
          const groupedProducts = data.data.products.reduce((acc: any, product: any) => {
            const categoryGroup = acc.find((group: any) => group.category === product.category);

            if (categoryGroup) {
              categoryGroup.products.push(product);
            } else {
              acc.push({ category: product.category, products: [product] });
            }

            return acc;
          }, [] as { category: string; products: any }[]);
          this.products = groupedProducts;
        }
      }, err => {
        alert("Something went wrong")
      }
    )
  }

}
