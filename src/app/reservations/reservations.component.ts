import { Component, OnInit } from '@angular/core';
import { reservation } from '../Models/reservation';
import { ReservationsServiceService } from '../services/reservations-service.service';
import { etudiant } from '../Models/etudiant';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  constructor(private reservationService: ReservationsServiceService) { }
  reservations: reservation[] = []
  etudiants: etudiant[] = []
  ngOnInit(): void {
    this.getReservations()
  }


  getReservations() {
    this.reservationService.getAllReservations().subscribe(
      (data: reservation[]) => {
        this.reservations = data;
        console.log(this.reservations)
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  getStudents() {
    this.reservationService.getAllStudents().subscribe(
      (data: etudiant[]) => {
        this.etudiants = data;
        console.log(this.etudiants)
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }
  validateReservation(idReservation: number): void {
    this.reservationService.validerReservation(idReservation).subscribe(
      () => {
        console.log('Reservation validated successfully');
        // Add any additional logic or UI updates here
        this.getReservations()
      },
      (error) => {
        console.error('Error validating reservation', error);
        // Handle errors or show user-friendly messages
      }
    );
  }
  
}
