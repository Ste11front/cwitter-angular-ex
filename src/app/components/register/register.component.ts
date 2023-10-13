import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OurUser } from 'src/app/model/our-user';
import { CustomValidator } from 'src/app/custom-validator';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})



export class RegisterComponent {

  emailFormControl = new FormControl;
  matcher = new ErrorStateMatcher();
  showPassword: boolean = false;

  registerForm = this.fb.group({

    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    psw: ['', [Validators.required, CustomValidator.CustomPasswordValidator()]],
    showPassword: [false],
    country: [''],
    yob: [2023, [Validators.required, CustomValidator.checkNotMinor()]],
    gender: [''],
    url: [''],
    cwitIds:['']
  })

  constructor(private fb: FormBuilder, private authServ: AuthService){};

  onSubmit(){

    const email = this.registerForm.value.email;
    const psw = this.registerForm.value.psw;
    const country = this.registerForm.value.country;
    const yob = this.registerForm.value.yob;
    const url = this.registerForm.value.url;
    const gender = this.registerForm.value.gender;
    const OurUser: OurUser = {
      username: this.registerForm.value.username!,
      yob: this.registerForm.value.yob!,
      email: this.registerForm.value.email!,
      psw: this.registerForm.value.psw!,
      country: this.registerForm.value.country!,
      url: this.registerForm.value.url!,
      gender: this.registerForm.value.gender!,
      cwitIds: this.registerForm.value.cwitIds!
    }


    this.authServ.registerUser(OurUser, email!, psw!)
    this.registerForm.reset()
    


  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
