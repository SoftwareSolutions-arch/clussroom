import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';

@Component({
  selector: 'app-edit-profile-user-detail',
  templateUrl: './edit-profile-user-detail.component.html',
  styleUrls: ['./edit-profile-user-detail.component.css']
})
export class EditProfileUserDetailComponent implements OnInit {
  imageSrc: string;
  isLoadingBool: boolean = false;
  data: any;
  userData: any;
  imageData: any;
  constructor(private service: SharedServiceService,private util: UtilService,private router: Router) { }

  ngOnInit() {
    this.getData();
  }
  userForm = new FormGroup({
    name :new FormControl(''),
lastName : new FormControl(''),
image : new FormControl(''),
fileSource: new FormControl('',),
email: new FormControl('',)
  })

  // upload image
  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.userForm.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }
    // edit profile api
    editProfile(){
      this.isLoadingBool = true
      const data = {
        "user_id":localStorage.getItem('uid'),
        "first_name":this.userForm.value.name,
        "last_name": this.userForm.value.lastName,
        "email":"",
        "school_name":"",
        "instruction_name":"",
        "timezone":"",
        "image": this.imageSrc
        
      }
      this.service.post('edit-profile-api',data,1).subscribe(res => {
        this.isLoadingBool =false;
        if(res.result == 'success'){
          this.util.showSuccessAlert('Profile Uploaded Successfully')
          setTimeout(() => {
            this.router.navigateByUrl('/student_profile');
          }, 1000);
        }
      })
    }
  //  patch data
     getData(){
      const data ={
        "user_id":localStorage.getItem('uid')
      }
      this.service.post('user-profile-api',data,1).subscribe(res => {
      this.userData = res.result
      this.imageData = res.result.avatar
      
      this.userForm.patchValue({
        name : this.userData.firstname,
        lastName: this.userData.lastname,
        // image: this.userData.avatar,
        email: this.userData.email
      })
      })
     }
}
