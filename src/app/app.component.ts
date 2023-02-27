import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { WizardRequest } from './interfaces/wizardrequest';
import { WizardRequestService } from './Services/wizardrequest.service';

import { MatDialog } from '@angular/material/dialog';
import { ModalAddEditComponent } from './modal/modal-add-edit/modal-add-edit.component';
import { ModalDeleteComponent } from './modal/modal-delete/modal-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'Wizard Request ID',
    'Wizard Name',
    'Wizard Last Name',
    'Wizard Muggle ID',
    'Wizard Age',
    'Aspiring House',
    'Acciones',
  ];
  dataSource = new MatTableDataSource<WizardRequest>();

  constructor(
    private _wizardRequestService: WizardRequestService,
    public dialog: MatDialog,
    private _snackBar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.displayWizardRequests();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayWizardRequests() {
    this._wizardRequestService.getList().subscribe({
      next: (responseData) => {
        console.log(responseData);
        this.dataSource.data = responseData;
      },
      error: (e) => {},
    });
  }

  modalNewWizardRequest() {
    this.dialog.open(ModalAddEditComponent, {
      disableClose:true,
      width:'350px'
    }).afterClosed().subscribe(result =>{
      if(result === "Created"){
        this.displayWizardRequests();
      }
    });
  }

  modalEditWizardRequest(dataWizardRequest : WizardRequest) {
    this.dialog.open(ModalAddEditComponent, {
      disableClose:true,
      width:'350px',
      data : dataWizardRequest
    }).afterClosed().subscribe(result =>{
      if(result === "Updated"){
        this.displayWizardRequests();
      }
    });
  }

  showAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration : 3000
    });
  }

  modalDeleteWizardRequest(dataWizardRequest: WizardRequest){
  this.dialog.open(ModalDeleteComponent, {
    disableClose:true,
    data : dataWizardRequest
  }).afterClosed().subscribe(result =>{
    if(result === "Deleted"){
      this._wizardRequestService.delete(dataWizardRequest.wizardId).subscribe({
        next:(data)=>{
          this.showAlert("Wizard Request Deleted", "Done");
          this.displayWizardRequests();
        }, error:(e)=>{}
      });
    }
  });
}
}
