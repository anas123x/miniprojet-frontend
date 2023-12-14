import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Foyer } from '../Models/Foyer';
import { environment } from 'src/environments/environment';
import { Bloc } from '../Models/Bloc';

@Injectable({
  providedIn: 'root'
})
export class FoyerservicesService {


  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient) { }
 accountUrl = "http://localhost:8089/api/";
    public getFoyers(): Observable<Foyer[]> {
    console.log("service appelé");

    return this.http.get<Foyer[]>(this.accountUrl + "retrieve-all-foyer");
  }

  public addFoyer(foyer: any) {
    return this.http.post(this.accountUrl + "/admin/foyer/add-foyer", foyer);
  }
   deleteFoyer(id: any) {
    return this.http.delete(this.accountUrl + "admin/foyer/delete-foyer/" + id);
  }
getFoyerById(id: number): Observable<Foyer> {
  return this.http.get<Foyer>(this.accountUrl + "admin/foyer/retrieve-foyer/" + id);
}

 updateFoyer(foyerId: number, foyer: Foyer): Observable<Foyer> {
    return this.http.put<Foyer>(
      this.accountUrl + "admin/foyer/modifier-foyer/" + foyerId,
      foyer,
      this.httpOptions
    );
  }
 getBlocksByFoyer(foyerId: number): Observable<Bloc[]> {
    return this.http.get<Bloc[]>(this.accountUrl+"foyer/"+foyerId+"/blocks");
  }

}
