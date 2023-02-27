import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs'
import { WizardRequest } from '../interfaces/wizardrequest';

@Injectable({
  providedIn: 'root'
})
export class WizardRequestService {

  private endpoint:string = 'http://localhost:5079/';
  private apiUrl:string = this.endpoint + "WizardRequest/"

  constructor( private http : HttpClient) { }

  getList():Observable<WizardRequest[]>{
    return this.http.get<WizardRequest[]>(`${this.apiUrl}list`)
  }

  add(model:WizardRequest):Observable<WizardRequest>{
    return this.http.post<WizardRequest>(`${this.apiUrl}save`,model)
  }

  update(WizardId:number, model:WizardRequest):Observable<WizardRequest>{
    return this.http.put<WizardRequest>(`${this.apiUrl}update/${WizardId}`, model)
  }

  delete(WizardId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}delete/${WizardId}`)
  }
}
