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

  constructor(private auth: AuthService) {}

  ngOnInit() {}
  register() {
    this.auth.register(this.model).subscribe(
      () => {
        console.log('registration successful');
      },
      error => {
        console.log(error);
      }
    );
    console.log(this.model);
  }
  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}
