import { Injectable } from "@angular/core";
import * as alertify from "../../../node_modules/alertifyjs/build/alertify.js"; // import

@Injectable({
  providedIn: "root"
})
export class AlertifyService {
  constructor() {
    alertify.defaults.transition = "slide";
    alertify.defaults.theme.ok = "btn btn-primary";
    alertify.defaults.theme.cancel = "btn btn-danger";
    alertify.defaults.theme.input = "form-control";
    alertify.defaults.notifier.delay = 2;
    alertify.defaults.notifier.position = "bottom-left";
    alertify.defaults.notifier.closeButton = false;
  }

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallback();
      } else {
      }
    });
  }
  success(message: string) {
    alertify.success(message);
  }
  error(message: string) {
    alertify.error(message);
  }
  warning(message: string) {
    alertify.warning(message);
  }
  message(message: string) {
    alertify.message(message);
  }
}
