import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  peopleForm !: FormGroup;
  actionBtn : string = 'Salvar';


  constructor(
    private formBuilder: FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.peopleForm = this.formBuilder.group({
      name : ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      birth_at: ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = 'Atualizar'
      this.peopleForm.controls['name'].setValue(this.editData.name);
      this.peopleForm.controls['email'].setValue(this.editData.email);
      this.peopleForm.controls['phone'].setValue(this.editData.phone);
      this.peopleForm.controls['birth_at'].setValue(this.editData.birth_at);
    }
  }

  addPeople(){
    if(!this.editData){
      if(this.peopleForm.valid){
        this.api.postPeople(this.peopleForm.value)
        .subscribe({
          next:(res)=>{
            alert("Pessoa cadastrada com sucesso!");
            this.peopleForm.reset();
            this.dialogRef.close('Salvo');
          },
          error:()=>{
            alert("Error ao cadastrar uma pessoa");
          }
        })
      }
    }else{
      this.updatePeople()
    }
  }

  updatePeople(){
    this.api.putPeople(this.peopleForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert('Pessoa atualizada com sucesso!');
        this.peopleForm.reset();
        this.dialogRef.close('Atualizado');
      },
      error:()=>{
        alert('Error ao atualizar')
      }
    })
  }

}
