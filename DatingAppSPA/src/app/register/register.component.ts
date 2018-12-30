import { AlertifyService } from "./../services/alertify.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../services/auth.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { PARAMETERS } from "@angular/core/src/util/decorators";
import { BsDatepickerConfig } from "ngx-bootstrap";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private auth: AuthService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: "theme-red"
    };
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        gender: ["male"],
        username: ["", Validators.required],
        knownAs: ["", Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ["", Validators.required],
        country: ["", Validators.required],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8)
          ]
        ],
        confirmPassword: ["", Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(par: FormGroup) {
    return par.get("password").value === par.get("confirmPassword").value
      ? null
      : { mismatch: true };
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
