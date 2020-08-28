import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of} from 'rxjs';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {
    //removed promise due to on e]promise we need to react but on observable we can cancel any time

    constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }
    getDishes(): Observable<Dish[]> {
        //passing data type in get method how to get json obseject
        return this.http.get<Dish[]>(baseURL + 'dishes')
            .pipe(catchError(this.processHTTPMsgService.handleError)); // if error occur  pipe, will catcheroor as we are passing catch error
                                                                       // mehtod from rxjs , or else empty pipe run since no other operators                                 
        //Note : we can pass method or operators in pipe
    }

    getDish(id: string): Observable<Dish> {
        return this.http.get<Dish>(baseURL + 'dishes/' + id)
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getFeaturedDish(): Observable<Dish> {
        return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0])
            ,catchError(this.processHTTPMsgService.handleError));
    }

    getDishIds(): Observable<string[] | any> {
        //map give return paticular array given in below it create array of dish.id
        return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id))
            ,catchError(error => error)); // here no need of htto errmsg if error it gives error messgae we need to catch it
    }

    putDish(dish: Dish): Observable<Dish> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json' // send as json object+
            })
        };
        return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
            .pipe(catchError(this.processHTTPMsgService.handleError));

    }

}
