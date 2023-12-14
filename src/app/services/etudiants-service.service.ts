import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { etudiant } from '../Models/etudiant';
import { reservation } from '../Models/reservation';


@Injectable({
  providedIn: 'root'
})
export class EtudiantsServiceService {

  constructor(private _http: HttpClient) { }

  apiUrl: string = environment.baseUrl;

  getAllStudents() {
    return this._http.get<etudiant[]>(this.apiUrl + "etudiant" + "/retrieve-all-etudiant")
  }

  addStudent(etudiant: etudiant) {
    return this._http.post<etudiant>(this.apiUrl + "etudiant" + "/addetudiant", etudiant)
  }

  updateStudent(etudiant: etudiant) {
    return this._http.put<etudiant>(this.apiUrl + "etudiant" + "/updateetudiant", etudiant)
  }

  removeStudent(idEtudiant: number) {
    return this._http.delete<etudiant>(this.apiUrl + "etudiant" + "/remouve-etudiant/"+idEtudiant)
  }
  
  findStudent(idEtudiant: number){
    return this._http.get<etudiant>(this.apiUrl+ "etudiant" + "/retrieve-etudiant/"+idEtudiant)
  }

  findStudentWithEmail(email: string){
    return this._http.get<etudiant>(this.apiUrl+"etudiant"+"/findEtudiantwithemail/"+email)
  }
  passReservation(idEtudiant: number, res:reservation){
    //long idEtudiant , Reservation res
    return this._http.post<reservation>(this.apiUrl+"etudiant"+"/passerUneReservation/"+idEtudiant, res)
  }
  

}
