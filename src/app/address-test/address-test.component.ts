import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'address',
  templateUrl: './address-test.component.html',
  styleUrls: ['./address-test.component.scss']
})
export class AddressTestComponent {
  @Input('group')
  public adressForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
