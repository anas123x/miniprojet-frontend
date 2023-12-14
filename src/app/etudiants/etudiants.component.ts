import { Component, OnInit } from '@angular/core';
import { EtudiantsServiceService } from '../services/etudiants-service.service';
import { etudiant } from '../Models/etudiant';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent implements OnInit {
  addStudentForm: FormGroup;
  etudiants: etudiant[] = []
  constructor(private etudiantService: EtudiantsServiceService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getStudents();
    this.addStudentForm = this.fb.group({
      idEtudiant: ['', Validators.required],
      nomEt: ['', Validators.required],
      prenomEt: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ecole: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      cin: ['', Validators.required],
      reservations: [[]],
    });

  }
  getStudents() {
    this.etudiantService.getAllStudents().subscribe(
      (data: etudiant[]) => {
        this.etudiants = data;
        console.log(this.etudiants)
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  addStudent() {
    console.log("ccccc")
    if (this.addStudentForm.invalid) {
      console.log("ffffff")
      // If the form is invalid, mark all fields as touched to display validation errors
      this.addStudentForm.markAllAsTouched();
      return;
    }
    const studentData: etudiant = {
      idEtudiant: this.addStudentForm.get('idEtudiant')?.value,
      nomEt: this.addStudentForm.get('nomEt')?.value,
      prenomEt: this.addStudentForm.get('prenomEt')?.value,
      email: this.addStudentForm.get('email')?.value,
      ecole: this.addStudentForm.get('ecole')?.value,
      dateNaissance: this.addStudentForm.get('dateNaissance')?.value,
      cin: this.addStudentForm.get('cin')?.value,
      reservations: []

      //nomEt: this.userProfileForm.get('nom')?.value,
      //prenomEt: this.userProfileForm.get('prenom')?.value,
    }

    console.log(studentData)
    this.etudiantService.addStudent(studentData).subscribe(
      (response) => {
        console.log("azerty")
        console.log('Update successful:', response);
        // Handle success, if needed
        this.closeModel3()
      },
      (error) => {
        console.error('Error during update:', error);
        // Handle error, if needed
      }
    );
  }
  openModel3() {
    const modelDiv = document.getElementById('thirdmodal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }
  closeModel3() {
    const modelDiv = document.getElementById('thirdmodal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
}
