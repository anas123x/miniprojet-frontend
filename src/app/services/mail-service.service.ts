import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

  constructor(private _http: HttpClient) { }
  apiUrl: string = environment.baseUrl;

  sendMail(subject: string, message: string) {
    const payload = { subject, message };
    return this._http.post(this.apiUrl + "/mailer" + "/sendMailToStudentWithValidReservation2", payload)
    //return this._http.post<etudiant>(this.apiUrl + "etudiant" + "/addetudiant", etudiant)

  }
}
