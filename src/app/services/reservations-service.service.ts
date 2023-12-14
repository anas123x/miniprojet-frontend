import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { reservation } from '../Models/reservation';
import { etudiant } from '../Models/etudiant';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReservationsServiceService {

  constructor(private _http: HttpClient) { }
  apiUrl: string = environment.baseUrl;
  getAllReservations() {
    return this._http.get<reservation[]>(this.apiUrl + "reservation" + "/retrieveReservations")
    //return this._http.get<etudiant[]>(this.apiUrl + "etudiant" + "/retrieve-all-etudiant")
  }
  getAllStudents() {
    return this._http.get<etudiant[]>(this.apiUrl + "etudiant" + "/retrieve-all-etudiant")
  }
  findStudentWithEmail(email: string){
    return this._http.get<etudiant>(this.apiUrl+"etudiant"+"/findEtudiantwithemail/"+email)
  }

  validerReservation(idReservation: number){
    return this._http.get(this.apiUrl+"reservation"+"/validerReservation/"+idReservation)
  }
  statistiquesReservation(){
    return this._http.get(this.apiUrl+"reservation"+"/statistiques")
  }
}
