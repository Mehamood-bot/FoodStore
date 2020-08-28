import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    host: {
        '[@flyInOut]': 'true',
        'style': 'display: block;'
    },
    animations: [
        flyInOut(),
        expand()
    ]
})
export class MenuComponent implements OnInit {
    dishes: Dish[];
    errMess: string;
    //selectedDish: Dish; update  code to route
    active: boolean;
    constructor(public dishservice: DishService, @Inject('BaseURL') public BaseURL) { }

    ngOnInit() {
        this.dishservice.getDishes()
            .subscribe(dishes => this.dishes = dishes,
                errmess => this.errMess = <any>errmess);
    }
    //update  code to route
  //onSelcted(dish:Dish){
  //    this.selectedDish=dish;
  //}
   activateClass() {
        this.active = !this.active;
   }
}
