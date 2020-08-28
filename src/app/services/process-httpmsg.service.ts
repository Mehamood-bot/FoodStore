import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

    constructor() { }
    public handleError(error: HttpErrorResponse | any) {
        let errMsg: string;
        //error due to any instace form our side or any reasons
        if (error.error instanceof ErrorEvent) {
            errMsg = error.error.message ;
        }
        // error coming from server , to try give wrong url in any of featured dish
        else {
            errMsg = `${error.status} - ${error.statusText || ''} ${error.error}
                       oops`;
        }

        return throwError(errMsg);
    }
}
