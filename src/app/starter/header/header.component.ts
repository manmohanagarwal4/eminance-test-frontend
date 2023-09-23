import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  registerForm!: FormGroup;
  loginForm!: FormGroup;
  isAuth: boolean = false;
  currentUser: any;

  constructor(private _FB: FormBuilder, private _US: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this._FB.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.loginForm = this._FB.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
    this._US.getAuth().subscribe(
      (data: boolean) => {
        this.isAuth = data;
      }
    )
    this._US.getUser().subscribe(
      (data: any) => {
        this.currentUser = data;
      }
    )
  }

  message: string = '';
  register() {
    if (this.registerForm.valid) {
      this._US.register(this.registerForm.value).subscribe(
        (data: any) => {
          this.message = data.meta.msg;
          $('#registerModal').modal('hide');
          if (data.meta.status) {
            $('#success').modal('show');
            $('#success').on('hidden.bs.modal', (event: any) => {
              this.message = '';
              this.registerForm.reset();
            })
          } else {
            $('#fail').modal('show');
            $('#fail').on('hidden.bs.modal', (event: any) => {
              this.message = '';
              this.registerForm.reset();
            })
          }
        }, err => {
          this.message = 'Something went wrong';
          $('#fail').modal('show');
          $('#fail').on('hidden.bs.modal', (event: any) => {
            this.message = '';
            this.registerForm.reset();
          })
        }
      )
    }
  }

  login() {
    if (this.loginForm.valid) {
      this._US.login(this.loginForm.value).subscribe(
        (data: any) => {
          this.message = data.meta.msg;
          $('#loginModal').modal('hide');
          if (data.meta.status) {
            localStorage.setItem('currentUser', JSON.stringify({ userName: data.data.userName, token: data.token }));
            this._US.updateUserAuth(true, { userName: data.data.userName, token: data.token });
            this.router.navigate(['/products']);
          } else {
            $('#fail').modal('show');
            $('#fail').on('hidden.bs.modal', (event: any) => {
              this.message = '';
              this.loginForm.reset();
            })
          }
        }, err => {
          this.message = 'Something went wrong';
          $('#fail').modal('show');
          $('#fail').on('hidden.bs.modal', (event: any) => {
            this.message = '';
            this.loginForm.reset();
          })
        }
      )
    }
  }

  logout() {
    this._US.logout().subscribe(
      (data: any) => {
        this.message = data.meta.msg;
        if (data.meta.status) {
          localStorage.removeItem('currentUser');
          this._US.updateUserAuth(false, null);
          $('#success').modal('show');
          setTimeout(() => {
            this.router.navigate(['/']);
            $('#success').modal('hide');
          }, 1000);
          $('#success').on('hidden.bs.modal', (event: any) => {
            this.router.navigate(['/']);
            this.message = '';
          })
        } else {
          $('#fail').modal('show');
          $('#fail').on('hidden.bs.modal', (event: any) => {
            this.message = '';
          })
        }
      }, err => {
        this.message = 'Something went wrong';
        $('#fail').modal('show');
        $('#fail').on('hidden.bs.modal', (event: any) => {
          this.message = '';
        })
      }
    )
  }

  hideSuccessModal() {
    $('#success').modal('hide');
  }

  hideFailModal() {
    $('#fail').modal('hide');
  }

}
