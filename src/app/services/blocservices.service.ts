import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Bloc } from '../classes/Bloc';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BlocservicesService {
  private apiUrl = environment.baseUrl+'api/'; // Remplacez cela par votre URL d'API

  constructor(private _http: HttpClient) {}

  getBlocs(): Observable<Bloc[]> {
    return this._http.get<Bloc[]>(this.apiUrl + 'admin/bloc/retrieve-all-bloc');
  }
}
