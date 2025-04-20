import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import cần thiết
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  passwordForm: FormGroup;

  constructor() {
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: this.passwordMatchValidator() });
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup; // Ép kiểu về FormGroup
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;

      return password === confirmPassword ? null : { mismatch: true };
    };
  }

  onResetPassword() {
    if (this.passwordForm.invalid) {
      alert('Thông tin không hợp lệ!');
    } else {
      alert('Mật khẩu đã được đặt lại thành công!');
      console.log(this.passwordForm.value); // Debug
    }
  }
}
