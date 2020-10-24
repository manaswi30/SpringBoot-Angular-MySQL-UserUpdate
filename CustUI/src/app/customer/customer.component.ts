

import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
export class Customer {
constructor(
    public loc_ref: string,
    public name: string,
    public previousDate: Date,
    public currentDate: Date,
private toastr: ToastrService

  ) {
    console.log("testing2");
  }
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers:Customer[];
  closeResult :string;



  constructor(

   private httpClient:HttpClient,
   private modalService: NgbModal


  ) {
    console.log("testing1");
   }

  ngOnInit(): void {
    this.getCustomers()
  }


  getCustomers(){
    console.log("testing 3");

    this.httpClient.get<any>('http://localhost:8081/Customer/').subscribe(
      response => {
        console.log(response);
        this.customers = response;
      }
    );
  }




 onSubmit(f: NgForm) {
  const url = 'http://localhost:8081/Customer/addNew';
  this.httpClient.post(url, f.value)
    .subscribe((result) => {
      this.ngOnInit(); //reload the table*/
    });
  this.modalService.dismissAll(); //dismiss the modal
}
}

