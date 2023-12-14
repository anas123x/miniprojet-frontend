import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { etudiant } from 'src/app/Models/etudiant';
import { reservation } from 'src/app/Models/reservation';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { EtudiantsServiceService } from 'src/app/services/etudiants-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private etudiantService: EtudiantsServiceService, private fb: FormBuilder,) { }
  userProfileForm: FormGroup;
  addReservationForm: FormGroup;
  connectedStudent!: etudiant;
  ngOnInit(): void {
    const studentConEmail = 'iidoudichaima@gmail.com';

    this.etudiantService.findStudentWithEmail(studentConEmail).subscribe(data => {
      this.connectedStudent = data;
      console.log(this.connectedStudent);

      // Move form initialization inside the subscribe callback
      this.userProfileForm = this.fb.group({
        nom: [this.connectedStudent.nomEt, [Validators.required]],
        prenom: [this.connectedStudent.prenomEt, [Validators.required]],
        cin: [this.connectedStudent.cin, [Validators.required]],
      });
      this.addReservationForm = this.fb.group({
        idReservation: 0,
        anneeUniversitaire: ['', [Validators.required]],
        numeroChambre: ['', [Validators.required]]

      });
    });
  }

  EditProfile() {
    console.log("aaaaa")
    if (this.userProfileForm.invalid) {
      console.log("bbbbbbb")
      // If the form is invalid, mark all fields as touched to display validation errors
      this.userProfileForm.markAllAsTouched();
      return;
    }

    const userData: etudiant = {
      idEtudiant: this.connectedStudent.idEtudiant,
      nomEt: this.userProfileForm.get('nom')?.value,
      prenomEt: this.userProfileForm.get('prenom')?.value,
      cin: this.userProfileForm.get('cin')?.value,
      ecole: this.connectedStudent.ecole,
      email: this.connectedStudent.email,
      dateNaissance: this.connectedStudent.dateNaissance,
      reservations: this.connectedStudent.reservations

    };
    console.log(userData)
    this.etudiantService.updateStudent(userData).subscribe(
      (response) => {
        console.log('Update successful:', response);
        // Handle success, if needed
        this.closeModel()
      },
      (error) => {
        console.error('Error during update:', error);
        // Handle error, if needed
      }
    );
  }
  openModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  closeModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  addReservation() {
    console.log("ccccc")
    if (this.addReservationForm.invalid) {
      console.log("ffffff")
      // If the form is invalid, mark all fields as touched to display validation errors
      this.addReservationForm.markAllAsTouched();
      return;
    }
    const reservationData: reservation = {
      idReservation: this.addReservationForm.get('idReservation')?.value,
      anneeUniversitaire: this.addReservationForm.get('anneeUniversitaire')?.value,
      estValid: false,
      etudiants: this.connectedStudent

      //nomEt: this.userProfileForm.get('nom')?.value,
      //prenomEt: this.userProfileForm.get('prenom')?.value,

    }
    const numeroChambre: number = this.addReservationForm.get('numeroChambre')?.value
    console.log(reservationData)
    console.log(numeroChambre)
    this.etudiantService.passReservation(this.connectedStudent.idEtudiant, reservationData, numeroChambre).subscribe(
      (response) => {
        console.log('Update successful:', response);
        // Handle success, if needed
        this.closeModel2()
      },
      (error) => {
        console.error('Error during update:', error);
        // Handle error, if needed
      }
    );
  }
  openModel2() {
    const modelDiv = document.getElementById('newModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }
  closeModel2() {
    const modelDiv = document.getElementById('newModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
}
