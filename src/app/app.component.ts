import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  form: FormGroup;
  fns = ["test", "test2"];

  ngOnInit() {
    this.form = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.usernameValidator.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.emailValidator.bind(this)
        ),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });
    // this.form.valueChanges.subscribe((value) => {});
    this.form.patchValue({
      userData: {
        username: "Test",
        email: "test",
      },
      gender: "male",
    });
  }

  onSubmit() {}

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.form.get("hobbies")).push(control);
  }

  usernameValidator(control: FormControl): { [s: string]: boolean } {
    if (this.fns.indexOf(control.value) != -1) {
      return { usernameNotAllowed: true };
    } else {
      return null;
    }
  }

  emailValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailNotAllowed: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
