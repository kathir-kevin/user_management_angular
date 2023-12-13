import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable, map, pipe } from 'rxjs';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  
  //private url: string = "http://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json";
  private url: string = "./assets/Countries.json";

  constructor(private http:HttpClient) { }

  allCountries(){
    return this.http.get<any>(`${this.url}`)
    .pipe(map((res:any)=>{
      console.log(res,"res");
      return res;
      
    }))
  }
  // allCountries(): Observable<any>{
  //   return this.http.get(this.url);
  // }

}
