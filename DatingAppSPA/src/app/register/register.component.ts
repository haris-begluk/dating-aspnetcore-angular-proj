import { AlertifyService } from "./../services/alertify.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;

  constructor(private auth: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)
      ]),
      confirmPassword: new FormControl("", Validators.required)
    });
  }
  register() {
    console.log(this.registerForm.value);
    // this.auth.register(this.model).subscribe(
    //   () => {
    //     this.alertify.success("Registration successful.");
    //   },
    //   error => {
    //     this.alertify.error(error);
    //   }
    // );
    // console.log(this.model);
  }
  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.warning("Cancelled.");
  }
}
