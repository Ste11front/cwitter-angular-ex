import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidator } from 'src/app/custom-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  showPassword: boolean = false;

  loginForm = this.fb.group({


    email: [''],
    psw: [''],

  })

  constructor(private fb: FormBuilder, private authServ: AuthService, private router:Router){};

  onSubmit(){
    const email = this.loginForm.value.email ;
    const psw = this.loginForm.value.psw;

    this.authServ.login(email!, psw!)
    this.router.navigateByUrl('/user')

  }

  resetPass(){
    this.authServ.resetEmail(this.loginForm.value.email!)
  }










}
