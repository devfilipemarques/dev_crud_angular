import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http : HttpClient) { }

  apiURL = "https://forassetapi.herokuapp.com/people/";

  postPeople(data : any){
    return this.http.post<any>(this.apiURL,data);
  }
  getPeople(){
    return this.http.get<any>(this.apiURL);
  }
  putPeople(data:any,id : number){
    return this.http.put<any>(this.apiURL+id, data)
  }
  deletePeople(id:number){
    return this.http.delete<any>(this.apiURL+id)
  }
}
