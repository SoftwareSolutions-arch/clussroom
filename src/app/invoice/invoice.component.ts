import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
// import { MatSliderModule } from '@angular/material/slider';
import { SharedServiceService } from '../shared-service.service';
import { UtilService } from '../../providers/util.service'

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  nidKey: any = '';
  invoiceDetails: any = {};
  isImageShow: boolean = true;
  isSpinnerShow: boolean = false;
  error_messages: any = '';
  invoiceForm: FormGroup;
  paymentForm: FormGroup;
  passwordNotMatch: any = '';
  title:any='';
  constructor(public formBuilder: FormBuilder, public util: UtilService,
    public router: Router, public http: HttpClient, public service: SharedServiceService
  ) {
    this.setupFormData();
    this.nidKey = localStorage.getItem('nidKey');
    this.getAllInvoiceList();
    this.paymentForm.disable();
    this.title = localStorage.getItem('title');

  }

  ngOnInit(): void {
  }

  setupFormData() {
    this.error_messages = {
      companyName: [
        { type: "required", message: '*Company Name is Required' },
        { type: "pattern", message: '*Please Enter character only' }
      ],
      firstName: [
        { type: "required", message: '*First Name is Required' },
        { type: "pattern", message: '*Please Enter character only' }
      ],
      lastName: [
        { type: "required", message: '*Last Name is Required' },
        { type: "pattern", message: '*Please Enter character only' }
      ],
      address: [
        { type: "required", message: '*Address is Required' }
      ],
      city: [
        { type: "required", message: '*City is Required' },
        { type: "pattern", message: '*Please Enter character only' }
      ],
      state: [
        { type: "required", message: '*State is Required' },
        { type: "pattern", message: '*Please Enter character only' }
      ],
      country: [
        { type: "required", message: '*Country is Required' },
        { type: "pattern", message: '*Please Enter character only' }
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
        { type: "required", message: '*Card holder Name is Required' },
        { type: "pattern", message: '*Please Enter character only' }
      ],
      cvv: [
        { type: "required", message: '*Cvv is Required' }
      ],
      cardNumber: [
        { type: "required", message: '*Card Number is Required' },
        { type: "max", message: '*Maximum length should be 16 digits only' },
        { type: "min", message: '*Minimum length should be 16 digits only' },
        { type: "pattern", message: '*Please Enter number only' }

      ],
      expiryDate: [
        { type: "required", message: '*Expirey Date is Required' },
        { type: "pattern", message: '*Please Enter correct expiry date  only' }
      ],

    };
    this.invoiceForm = this.formBuilder.group(
      {
        companyName: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z, ]*$')
          ])
        ),
        firstName: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z, ]*$')
          ])
        ),
        lastName: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z, ]*$')
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
            Validators.required,
            Validators.pattern('^[a-zA-Z, ]*$')
          ])
        ),
        state: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z, ]*$')
          ])
        ),
        country: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z, ]*$')
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
            Validators.required,
            Validators.pattern('^[a-zA-Z, ]*$')
          ])
        ),
        cvv: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        ),
        cardNumber: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.min(1000000000000000),
            Validators.max(9999999999999999),
            Validators.pattern('^[0-9, ]*$')
          ])
        ),
        expiryDate: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        )

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
      console.log("result+++P",result)
      this.isImageShow = false;
      this.invoiceDetails = result['nids'][0];
    })
      .catch(error => {
      })
  }

  // submit 
  submit() {
    this.isSpinnerShow = true
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

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
    this.service.postInvoiceDetails(params, { headers: headers }).then((result) => {
      console.log('result',result);
      if (result['status_message'] == 'User Created Successfully') {
        localStorage.setItem('userMail', result['email']);
        localStorage.setItem('firstName', result['fname']);
        this.isSpinnerShow = false;
        this.util.openSnackBarSuccess(result['status_message'])
        this.router.navigate(['/thanks-screen']);
      }
      else {
        this.util.errorAlertPopup(result['status_message']);
        this.isSpinnerShow = false;
      }
    })
      .catch(error => {
        this.util.errorAlertPopup(error['status_message'])
        this.isSpinnerShow = false;
      })
  }

  // add data
  add() {
    this.paymentForm.enable()
    this.invoiceForm.disable()
  }

  // enable previous page
  back() {
    this.invoiceForm.enable()
  }
}