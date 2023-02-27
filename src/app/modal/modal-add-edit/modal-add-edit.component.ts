import { Component, OnInit, Inject } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { House } from 'src/app/interfaces/house';
import { WizardRequest } from 'src/app/interfaces/wizardrequest';
import { WizardRequestService } from 'src/app/Services/wizardrequest.service';
import { HouseService } from 'src/app/Services/house.service';


@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.css']
})
export class ModalAddEditComponent implements OnInit{


  formWizardRequest: FormGroup;
  actionTitle:string = "New";
  actionButton:string = "Save";
  housesList: House[] = [];


  constructor(

    private modalReference: MatDialogRef<ModalAddEditComponent>,
    private fb : FormBuilder,
    private _snackBar: MatSnackBar,
    private _houseService : HouseService,
    private _wizardRequestService : WizardRequestService,
    @Inject(MAT_DIALOG_DATA) public dataWizardRequest : WizardRequest
  ){

    this.formWizardRequest=this.fb.group({
       wizardName : ['', Validators.required],
       wizardLastName : ['', Validators.required],
       wizardMuggleId : ['', Validators.required],
       wizardAge : ['', Validators.required],
       houseId : ['', Validators.required]

    })

    this._houseService.getList().subscribe({

      next: (responseData)=>{
        console.log(responseData)
        this.housesList = responseData;
      },error:(e)=>{}
    })
  }

  showAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration : 3000
    });
  }

  addEditWizardRequest(){

    const model : WizardRequest={
      wizardId : 0,
      wizardName : this.formWizardRequest.value.wizardName,
      wizardLastName : this.formWizardRequest.value.wizardLastName,
      wizardMuggleId : this.formWizardRequest.value.wizardMuggleId,
      wizardAge : this.formWizardRequest.value.wizardAge,
      houseId : this.formWizardRequest.value.houseId
    }

    if(this.dataWizardRequest == null){
      this._wizardRequestService.add(model).subscribe({
        next:(data)=>{
            this.showAlert("Wizard Sign Up Request has been set successfully", 'Done')
            this.modalReference.close("Created")
        },error:(e)=>{
          this.showAlert("Couldn't set your Sign Up Request, please verify your info", 'Error')
        }
      })
    }else {
      this._wizardRequestService.update(this.dataWizardRequest.wizardId, model).subscribe({
        next:(data)=>{
            this.showAlert("Wizard Sign Up Request has been edited successfully", 'Done')
            this.modalReference.close("Updated")
        },error:(e)=>{
          this.showAlert("Couldn't edit your Sign Up Request, please verify your info", 'Error')
        }
      })
    }

    
  }


  ngOnInit(): void {
    

    if(this.dataWizardRequest){
      this.formWizardRequest.patchValue({
        wizardName : this.dataWizardRequest.wizardName,
        wizardLastName : this.dataWizardRequest.wizardLastName,
        wizardMuggleId : this.dataWizardRequest.wizardMuggleId,
        wizardAge : this.dataWizardRequest.wizardAge,
        houseId : this.dataWizardRequest.houseId
      })


      this.actionTitle = "Edit"
      this.actionButton = "Update"
    }

  }

}
