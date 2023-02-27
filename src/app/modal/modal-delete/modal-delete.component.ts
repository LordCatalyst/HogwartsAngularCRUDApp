import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import { WizardRequest } from 'src/app/interfaces/wizardrequest';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit{
  constructor(

    private modalReference: MatDialogRef<ModalDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataWizardRequest : WizardRequest
  ){
}

ngOnInit(): void {
  
}

confirmDelete(){
  if (this.dataWizardRequest){
    this.modalReference.close("Deleted")
  }
}

}
