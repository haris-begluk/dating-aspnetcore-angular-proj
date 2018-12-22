import { Injectable } from '@angular/core';
import * as alertify from '../../../node_modules/alertifyjs/build/alertify.js'; // import

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() {
    alertify.defaults = {
      // dialogs defaults
      autoReset: true,
      // notifier defaults
      notifier: {
        // auto-dismiss wait time (in seconds)
        delay: 2,
        // default position
        position: 'bottom-left',
        // adds a close button to notifier messages
        closeButton: false
      }
    };
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
