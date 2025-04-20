import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { catchError, switchMap, throwError, Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  /*
  Hàm inject() được dùng để lấy một instance của HttpClient mà không cần khai báo trong constructor.
  */
  const http = inject(HttpClient);

  // Danh sách các API cần xác thực
  const protectedEndpoints = ['/v1/category', '/v1/product'];
  const isProtectedAPI = protectedEndpoints.some(endpoint => req.url.includes(endpoint));
  const isModifyingMethod = ['POST', 'PUT', 'DELETE'].includes(req.method.toUpperCase());

  if (!isProtectedAPI || !isModifyingMethod) {
    return next(req); // Nếu không phải API cần bảo vệ thì tiếp tục request
  }

  const loginData = localStorage.getItem('login');

  if (!loginData) {
    location.assign('/login'); // Chuyển hướng đến trang đăng nhập nếu không có thông tin đăng nhập
    return throwError(() => new Error('Not authenticated'));
  }

  let { accessToken, refreshToken, admin } = JSON.parse(loginData);

  if (!accessToken || !admin) {
    return throwError(() => new Error('Không có token hợp lệ hoặc không phải admin'));
  }

  let clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  // Xử lý lỗi xác thực và tự động làm mới token nếu gặp lỗi 403
  return next(clonedReq).pipe(
    catchError(err => {
      if (err.status === 403 && refreshToken) {
        return http.post<{ accessToken: string, refreshToken: string }>(
          'http://127.0.0.1:8000/v1/account/refresh',
          { refreshToken }
        ).pipe(
          switchMap((res) => {
            // Cập nhật lại localStorage với token mới
            const updatedLoginData = { accessToken: res.accessToken, refreshToken: res.refreshToken };
            localStorage.setItem('login', JSON.stringify(updatedLoginData));

            // Gửi lại request ban đầu với token mới
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.accessToken}`
              }
            });
            return next(retryReq);
          }),
          catchError(() => {
            localStorage.removeItem('login');
            location.assign('/login');
            return throwError(() => new Error('Phiên đăng nhập đã hết hạn'));
          })
        );
      }
      return throwError(() => err);
    })
  );
};
