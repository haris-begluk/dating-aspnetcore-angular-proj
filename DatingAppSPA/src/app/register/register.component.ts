import { AlertifyService } from './../services/alertify.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private auth: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {}
  register() {
    this.auth.register(this.model).subscribe(
      () => {
        this.alertify.success('Registration successful.');
      },
      error => {
        this.alertify.error(error);
      }
    );
    // console.log(this.model);
  }
  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.warning('Cancelled.');
  }
}
