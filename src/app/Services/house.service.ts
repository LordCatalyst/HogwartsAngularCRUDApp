import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs'
import { House } from '../interfaces/house';

@Injectable({
  providedIn: 'root'
})
export class HouseService {


  private endpoint:string = 'http://localhost:5079/';
  private apiUrl:string = this.endpoint + "House/"

  constructor( private http : HttpClient) { }

  getList():Observable<House[]>{
    return this.http.get<House[]>(`${this.apiUrl}list`)
  }

}
