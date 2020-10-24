import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {DpDatePickerModule} from 'ng2-date-picker';

export class Home {
constructor(
private toastr : ToastrService,
    public loc_ref: string,
    public name: string,
    public previousDate: Date,
    private currentDate: Date

  ) {
    console.log("testing2");
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 /* home:Home[];*/
  closeResult :string;



  constructor(

   private httpClient:HttpClient,
   private modalService: NgbModal,
    private toastr: ToastrService,


  ) {
    console.log("testing1");
   }

  ngOnInit(): void {
   /* this.getCustomers()*/
  }




  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

 onSubmit(f: NgForm) {
this.toastr.info('sucessfully updated');
console.log("manaswi");
console.log("value tobe updated",f.value.loc_ref);
const customerId=f.value.loc_ref
  const url = 'http://localhost:8081/Customer/edit/'+customerId;
  this.httpClient.put(url, f.value)
    .subscribe((result) => {
      this.ngOnInit(); //reload the table*/

    });

  this.modalService.dismissAll(); //dismiss the modal
}
}
