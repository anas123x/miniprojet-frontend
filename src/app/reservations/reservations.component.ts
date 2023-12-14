import { Component, OnInit } from '@angular/core';
import { reservation } from '../Models/reservation';
import { ReservationsServiceService } from '../services/reservations-service.service';
import { etudiant } from '../Models/etudiant';
import { MailServiceService } from '../services/mail-service.service';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  constructor(private reservationService: ReservationsServiceService, private mailerService: MailServiceService) { }
  stats: number
  reservations: reservation[] = []
  etudiants: etudiant[] = []
  ngOnInit(): void {
    this.getReservations()
    this.statistiques()
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
        this.sendMailToStudentWithValidReservation
        this.getReservations()

      },
      (error) => {
        console.error('Error validating reservation', error);
        // Handle errors or show user-friendly messages
      }
    );
  }
  sendMailToStudentWithValidReservation() {
    const subject = 'Welcome';
    const message = 'Dear student, VotreUniversite vous sollicite de payer la facture. Cordialement';

    this.mailerService.sendMail(subject, message).subscribe(
      (response) => {
        console.log('Mail sent to students with valid reservations:', response);
        // Handle success, if needed
      },
      (error) => {
        console.error('Error sending mail:', error);
        // Handle error, if needed
      }
    );
  }
  createDonutChart(pourcentageValides: number, pourcentageInvalides: number) {
    const ctx = document.getElementById('donutChart') as HTMLCanvasElement;
    const donutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Valides', 'Invalides'],
        datasets: [{
          data: [pourcentageValides, pourcentageInvalides],
          backgroundColor: ['#FC7F4C', '#FFFFFF'], // Couleurs de fond pour chaque segment
          hoverBackgroundColor: ['#FFFFFF', '#FFFFFF'],
        }]
      },

      options: {

      }
    });
  }

  statistiques() {
    this.reservationService.statistiquesReservation().subscribe(
      (pourcentageValides: number) => {
        const pourcentageInvalides = 100 - pourcentageValides;
        this.createDonutChart(pourcentageValides, pourcentageInvalides);
      },
      (error) => {
        console.error("Error fetching statistics:", error);
      }
    );
  }

}
