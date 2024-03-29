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
  backButton: boolean = true;
  nidKey: any = '';
  allCountryList: any = '';
  allStateList: any = '';
  allCityList: any = '';
  invoiceDetails: any = {};
  isImageShow: boolean = true;
  isSpinnerShow: boolean = false;
  backButtonClicked: boolean = false;
  enablePaymemtForm: boolean = true;
  error_messages: any = '';
  invoiceForm: FormGroup;
  paymentForm: FormGroup;
  passwordNotMatch: any = '';
  title: any = '';
  myValue: boolean = false;
  authToken: any = '';
  constructor(public formBuilder: FormBuilder, public util: UtilService,
    public router: Router, public http: HttpClient, public service: SharedServiceService
  ) {
    this.setupFormData();
    this.nidKey = localStorage.getItem('nidKey');
    this.getAllInvoiceList();
    this.paymentForm.disable();
    this.title = localStorage.getItem('title');
    this.getNewToken();
  }

  ngOnInit(): void {
  }

  setupFormData() {
    this.error_messages = {
      firstName: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please enter character only' }
      ],
      lastName: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please enter character only' }
      ],
      city: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please enter character only' }
      ],
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
        { type: "required", message: '*Required' }
      ],
      cardNumber: [
        { type: "required", message: '*Required' },
      ],
      expiryDate: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please Enter correct expiry date  only' }
      ],

    };
    this.invoiceForm = this.formBuilder.group(
      {
        companyName: new FormControl(
          "",
          Validators.compose([
            Validators.pattern('^[a-zA-Z, ]*$')
          ])
        ),
        firstName: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?')
          ])
        ),
        lastName: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?')
          ])
        ),
        address: new FormControl(
          "",
          Validators.compose([
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
        email: new FormControl("", Validators.compose([
          Validators.required,
          this.equalto('cmail'),
          Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),])),
        cmail: new FormControl("", Validators.compose([
          Validators.required,
          this.equalto('email'),
          Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),])),
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
    // console.log(this.invoiceForm.value);
    // if (this.invoiceForm.invalid) {
    //   return;
    // }
    // else {
     
    // }

    this.myValue = false;
    this.paymentForm.enable();
    this.invoiceForm.disable();
    this.enablePaymemtForm = false;
  }

  // enable previous page
  back() {
    this.myValue = true;
    this.invoiceForm.enable()
  }

  // get invoice list
  getAllInvoiceList() {
    let data = {
      "step": "3",
      "package_nid": this.nidKey
    }

    this.service.post('vendor-registration', data, 0).subscribe(result => {

      this.isImageShow = false;
      this.invoiceDetails = result['nids'][0];
    })
  }

  // submit all invoice details
  submit() {
    this.backButton = false;
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
      this.backButton = true;
      if (result['status_message'] == 'User Created Successfully') {
        localStorage.setItem('userMail', result['email']);
        localStorage.setItem('firstName', result['fname']);
        localStorage.setItem('isPasswordSet', '0');
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

  getNewToken() {
    this.service.getAuthToken('getaccesstoken/').subscribe(result => {
      this.authToken = result.auth_token;
      this.getCountry();
    })
  }

  getCountry() {
    this.allStateList = '';
    this.allCityList = null;
    this.service.getData('countries/', this.authToken).subscribe(result => {
      this.allCountryList = result
    })
  }

  getState() {
    this.isImageShow = true;
    this.allCityList = null;
    this.service.getData('states/' + this.invoiceForm.value.country.country_name, this.authToken).subscribe(result => {
      this.isImageShow = false;
      this.allStateList = result;
    })
  }

  getCity() {
    this.isImageShow = true;
    this.service.getData('cities/' + this.invoiceForm.value.state.state_name, this.authToken).subscribe(result => {
      this.allCityList = result;
      this.isImageShow = false;
    })
  }
}