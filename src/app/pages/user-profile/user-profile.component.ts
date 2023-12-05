import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { etudiant } from 'src/app/Models/etudiant';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { EtudiantsServiceService } from 'src/app/services/etudiants-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private etudiantService: EtudiantsServiceService, private fb: FormBuilder) { }
  userProfileForm: FormGroup;
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
    });
  }




  onSubmit() {
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

}
