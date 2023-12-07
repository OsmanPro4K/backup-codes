import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  responseMessage: string = '';

  constructor(private router: Router, private backendService: BackendService) {}

  onSignUpHereClicked() {
    this.router.navigate(['/']);
  }

  onSignInClicked(event: Event, email: string, password: string) {
    event.preventDefault();
    this.backendService.loginUser(email, password).subscribe(
      (data) => {
        console.log(data.message);

        if (data.message === 'Login successful') {
          this.responseMessage = data.message
          alert('Login successful');
        } else {
          alert('Login failed');
        }
      },
      (error) => {
        console.log('Error getting information: ', error);
      }
    );
  }

  onCheckupCode(event: Event, backupCode: string, email: string) {
    event.preventDefault()
    this.backendService.checkCode(parseInt(backupCode), email).subscribe(
      (data) => {
        if (data.message === 'Code exists') {
          alert('Code exists');
        } else {
          alert('Code does not exist');
        }
      },
      (error) => {
        console.log("error: ", error);

      }
    )
  }
}
