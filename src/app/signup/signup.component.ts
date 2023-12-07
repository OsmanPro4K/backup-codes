import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  backupCodes: number[] = [];
  responseMessage!: string

  constructor(private router: Router, private backendService: BackendService) {}

  generateCodes() {
    this.backupCodes = []
    for (let i = 0; i < 4; i++) {
      let randomNumber = Math.floor(
        Math.random() * (99999999 - 10000000 + 1) + 10000000
      );
      this.backupCodes.push(randomNumber);
    }
  }
  async onSignUpClicked(event: Event, email: string, password: string) {
    event.preventDefault();

    await this.generateCodes()
    this.backendService.signUpUser(email, password, this.backupCodes).subscribe(
      (data) => {
        if(data.message === 'Success') {
          this.responseMessage = data.message
          alert(
              "Sign Up complete! Copy the code and keep it in a safe place. Continue by clicking the 'Sign In Here' button."
            )
        } else {
          alert('User already exists');
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  copyToClipboard() {
    const codesText = this.backupCodes.join('\n');
    const textarea = document.createElement('textarea');
    textarea.value = codesText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Succesfully Copied');
  }

  onNextClicked() {
    this.router.navigate(['login']);
  }
}
