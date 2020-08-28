import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADER } from '../shared/leaders';
import { delay, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class LeadersService {

    constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

    getLeaders(): Observable<Leader[]> {

        return this.http.get<Leader[]>(baseURL + 'leadership')
            .pipe(catchError(this.processHTTPMsgService.handleError));
        
        
    }
    getLeader(id: string): Observable<Leader>{
        return this.http.get<Leader>(baseURL + 'leadership/' + id)
            .pipe(catchError(this.processHTTPMsgService.handleError));
        
    }

    getFeaturedLeader(): Observable<Leader>{
        return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]))
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
