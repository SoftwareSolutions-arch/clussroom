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
  allCountryList: any = '';
  allStateList: any = '';
  allCityList: any = '';
  invoiceDetails: any = {};
  isImageShow: boolean = true;
  isSpinnerShow: boolean = false;
  enablePaymemtForm: boolean = true;
  error_messages: any = '';
  invoiceForm: FormGroup;
  paymentForm: FormGroup;
  passwordNotMatch: any = '';
  title: any = '';
  constructor(public formBuilder: FormBuilder, public util: UtilService,
    public router: Router, public http: HttpClient, public service: SharedServiceService
  ) {
    this.setupFormData();
    this.nidKey = localStorage.getItem('nidKey');
    this.getAllInvoiceList();
    this.paymentForm.disable();
    this.title = localStorage.getItem('title');
    this.getAllCountry();
  }

  ngOnInit(): void {
  }

  setupFormData() {
    this.error_messages = {
      // companyName: [
      //   { type: "required", message: '*Company name is required' },
      //   { type: "pattern", message: '*Please enter character only' }
      // ],
      firstName: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please enter character only' }
      ],
      lastName: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please enter character only' }
      ],
      // address: [
      //   { type: "required", message: '*Address is required' }
      // ],
      city: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please enter character only' }
      ],
      // state: [
      //   { type: "required", message: '*State is required' },
      //   { type: "pattern", message: '*Please enter character only' }
      // ],
      country: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please enter character only' }
      ],
      email: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please enter valid email' }
      ],
      cmail: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please enter valid email' }
      ],
      cardHolderName: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please enter character only' }
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
            // Validators.required,
            // Validators.pattern('^[a-zA-Z, ]*$')
          ])
        ),
        state: new FormControl(
          "",
          Validators.compose([
            // Validators.required,
            // Validators.pattern('^[a-zA-Z, ]*$')
          ])
        ),
        country: new FormControl(
          "",
          Validators.compose([
            // Validators.required,
            // Validators.pattern('^[a-zA-Z, ]*$')
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
            // Validators.required,
            // Validators.min(1000000000000000),
            // Validators.max(9999999999999999),
            // Validators.pattern('^[0-9, ]*$')
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

  // enable or disable form
  add() {
    this.paymentForm.enable();
    this.invoiceForm.disable();
    this.enablePaymemtForm = false;
  }

  // enable previous page
  back() {
    this.invoiceForm.enable()
  }

  // get invoice list
  getAllInvoiceList() {
    let data = {
      "step": "3",
      "package_nid": this.nidKey
    }

    this.service.post('vendor-registration', data, 0).subscribe(result => {
      console.log('result', result)
      this.isImageShow = false;
      this.invoiceDetails = result['nids'][0];
    })
  }

  // submit all invoice details
  submit() {
    if (this.invoiceForm.value.firstName == '' && this.paymentForm.value.cardNumber == '') {
      this.util.errorAlertPopup('Please insert all required values before proceed');
      return;
    }
    this.isSpinnerShow = true;
    const data = {
      'step': 4,
      'package_nid': this.nidKey,
      'cname': this.invoiceForm.value.companyName,
      'fname': this.invoiceForm.value.firstName,
      'lname': this.invoiceForm.value.lastName,
      'address': this.invoiceForm.value.address,
      'city': this.invoiceForm.value.city.name,
      'state': this.invoiceForm.value.state.name,
      'country': this.invoiceForm.value.country.name,
      'email': this.invoiceForm.value.email,
      'cardNumber': this.paymentForm.value.cardNumber,
      'cvv': this.paymentForm.value.cvv,
      'expiryDate': this.paymentForm.value.expiryDate,
      'cardHolderName': this.paymentForm.value.cardHolderName,
    }

    this.service.post('vendor-registration', data, 0).subscribe(result => {
      console.log('result', result)
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
  }

  // back to subscription page
  backToPreviousPage() {
    this.router.navigate(['/subscription'])
  }

  // get invoice list
  getAllCountry() {
    this.allStateList = '';
    this.allCityList = '';
    this.service.getData('countries').subscribe(result => {
      this.allCountryList = result
    })
  }

  getState() {
    this.service.getData('countries/' + this.invoiceForm.value.country.iso2 + '/states').subscribe(result => {
      this.allStateList = result
    })
  }

  getCity() {
    this.service.getData('countries/' + this.invoiceForm.value.country.iso2 + '/states/' + this.invoiceForm.value.state.iso2 + '/cities').subscribe(result => {
      this.allCityList = result
    })
  }
}
