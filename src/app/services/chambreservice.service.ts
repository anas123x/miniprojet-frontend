import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Chambre } from '../classes/Chambre';
@Injectable({
  providedIn: 'root'
})
export class ChambreserviceService {

  private apiUrl = environment.baseUrl+'api/'; // Remplacez cela par votre URL d'API

  constructor(private _http: HttpClient) {}

  getChambres(): Observable<Chambre[]> {
    return this._http.get<Chambre[]>(this.apiUrl + 'chambre/get-all-chambres');
    
  }
  updateChambre(chambre: Chambre): Observable<Chambre> {
    const updateUrl = this.apiUrl + 'admin/chambre/update-chambre'; 
    return this._http.put<Chambre>(updateUrl, chambre);
  }

  //getChambreById(idChambre)
  getChambreById(idChambre: number): Observable<Chambre> {
    return this._http.get<Chambre>(this.apiUrl +`admin/chambre/retrieve-chambre/${idChambre}`);
  }
  //addChambre
  addChambre(chambre: Chambre): Observable<Chambre> {
    return this._http.post<Chambre>(this.apiUrl + 'admin/chambre/add-chambre', chambre);
  }
  deleteChambre(idChambre : number) : Observable<Chambre>{
    return this._http.delete<Chambre>(this.apiUrl + `admin/chambre/delete-chambre/${idChambre}`);
  }
  /*deleteChambre(idChambre: number): Observable<any> {
    const url = `${this.apiUrl}removechambre/${idChambre}`;
    return this._http.delete(url).pipe(
      tap(response => console.log('Réponse du service après suppression : ', response)),
      catchError(error => {
        console.error('Erreur lors de la suppression de la chambre : ', error);
        throw error; // Rethrow l'erreur pour la gérer dans le composant
      })
    );
  }*/
  afficherparnombloc(nomBloc : String):Observable<Chambre>{
    return this._http.get<Chambre>(this.apiUrl + `getchparbloc/${nomBloc}`)
  }
}

