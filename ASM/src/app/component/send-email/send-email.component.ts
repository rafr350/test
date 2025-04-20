import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
})
export class SendEmailComponent {
  emailForm: FormGroup;

  constructor(private userService: UserService) {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSendEmail() {
    if (this.emailForm.invalid) {
      alert('Vui lòng nhập email hợp lệ!');
      return;
    }

    const email = this.emailForm.get('email')?.value;
    this.userService.sendResetEmail(email).subscribe({
      next: () => alert('Yêu cầu khôi phục mật khẩu đã được gửi!'),
      error: () => alert('Có lỗi xảy ra. Vui lòng thử lại!'),
    });
  }
}
