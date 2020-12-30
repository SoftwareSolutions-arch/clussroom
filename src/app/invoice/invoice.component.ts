import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
// import { MatSliderModule } from '@angular/material/slider';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  nidKey: any = '';
  invoiceDetails: any = {};
  isImageShow: boolean = true;
  error_messages: any = '';
  invoiceForm: FormGroup;
  paymentForm: FormGroup;
  passwordNotMatch: any = '';
  constructor(public formBuilder: FormBuilder, public router: Router, public http: HttpClient, public service: SharedServiceService,
    // public slider: MatSliderModule
  ) {
    this.setupLoginFormData();
    this.nidKey = localStorage.getItem('nidKey');
    this.getAllInvoiceList();
  }

  ngOnInit(): void {
  }

  setupLoginFormData() {
    this.error_messages = {
      companyName: [
        { type: "required", message: '*Company Name is Required' }
      ],
      firstName: [
        { type: "required", message: '*First Name is Required' }
      ],
      lastName: [
        { type: "required", message: '*Last Name is Required' }
      ],
      address: [
        { type: "required", message: '*Address is Required' }
      ],
      city: [
        { type: "required", message: '*City is Required' }
      ],
      state: [
        { type: "required", message: '*State is Required' }
      ],
      country: [
        { type: "required", message: '*Country is Required' }
      ],
      email: [
        { type: "required", message: '*Email is Required' },
        { type: "pattern", message: '*Please Enter valid Email' }
      ],
      cmail: [
        { type: "required", message: '*Confirm Email is Required' },
        { type: "pattern", message: '*Please Enter valid Email' }
      ],
      cardHolderName: [
        { type: "required", message: '*Card holder Name is Required' }
      ],
      cvv: [
        { type: "required", message: '*Cvv is Required' },
        { type: "minlength", message: '*Minimum length should be 3 digits only' }

      ],
      cardNumber: [
        { type: "required", message: '*Card Number is Required' },
        { type: "max", message: '*Maximum length should be 16 digits only' },
        { type: "min", message: '*Minimum length should be 16 digits only' }

      ],
      expiryDate: [
        { type: "required", message: '*Expirey Date is Required' }
      ],

    };
    this.invoiceForm = this.formBuilder.group(
      {
        companyName: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        ),
        firstName: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        ),
        lastName: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        ),
        address: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        ),
        city: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        ),
        state: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        ),
        country: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        ),
        email: new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),])),
        cmail: new FormControl("", Validators.compose([Validators.required, this.equalto('email'), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),])),
      }
    );

    this.paymentForm = this.formBuilder.group(
      {
        cardHolderName: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        ),
        cvv: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])
        ),
        cardNumber: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.min(1000000000000000),
            Validators.max(9999999999999999)
          ])
        ),
        expiryDate: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        ),
        email: new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),])),

      }
    );
  }

  // method for comparsion password and confirm password
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      let input = control.value;

      let isValid = control.root.value[field_name] == input
      if (!isValid)
        return { 'equalTo': { isValid } }
      else
        return null;
    };
  }

  //getting value of password and confirm password
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get("email");
    const { value: confirmPassword } = formGroup.get("cmail");
    if (password === confirmPassword) {
      this.passwordNotMatch = ""
    } else {
      this.passwordNotMatch = "email not match"
    }
  }

  // get all invoice list
  getAllInvoiceList() {
    let params = {
      "step": "3",
      "package_nid": this.nidKey
    }

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
    this.service.getInvoiceList(params, { headers: headers }).then((result) => {
      this.isImageShow = false;
      this.invoiceDetails = result['nids'][0];
    })
      .catch(error => {
      })
  }

  submit() {
    const params = {
      'step': 4,
      'package_nid': this.nidKey,
      'cname': this.invoiceForm.value.companyName,
      'fname': this.invoiceForm.value.firstName,
      'lname': this.invoiceForm.value.lastName,
      'address': this.invoiceForm.value.address,
      'city': this.invoiceForm.value.city,
      'state': this.invoiceForm.value.state,
      'country': this.invoiceForm.value.country,
      'email': this.invoiceForm.value.email,
      'cardNumber': this.invoiceForm.value.cardNumber,
      'cvv': this.invoiceForm.value.cvv,
      'expiryDate': this.invoiceForm.value.expiryDate,
      'cardHolderName': this.invoiceForm.value.cardHolderName,
    }

    console.log('params',params)
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
    this.service.postInvoiceDetails(params, { headers: headers }).then((result) => {

      console.log('result',result)

      localStorage.setItem("userCreated", 'true');
      window.alert('User Created Successfully');
      this.router.navigate(['/thanks-screen']);
    })
      .catch(error => {
      })
  }

}