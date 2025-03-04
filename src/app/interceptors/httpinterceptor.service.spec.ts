import { TestBed } from '@angular/core/testing';
import { inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


import { HttpinterceptorService, httpInterceptorProviders } from './httpinterceptor.service';

describe('HttpinterceptorService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [httpInterceptorProviders]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.removeItem('token');
  });

  it('should add Authorization header with token', () => {
    const token = 'your_mock_token';
    localStorage.setItem('token', token);

    const mockRequest = httpClient.get('/api/data');

    mockRequest.subscribe();

    const httpRequest = httpTestingController.expectOne('/api/data');

    const expectedHeaders = new HttpHeaders({ Authorization: 'Bearer ' + token });
    console.log('Headers:', httpRequest.request.headers);  // Debug para verificar os headers
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toEqual(expectedHeaders.get('Authorization'));

    httpRequest.flush({});
  });

  it('should navigate to login on 401 error', () => {
    spyOn(router, 'navigate');
    const mockRequest = httpClient.get('/api/data');

    mockRequest.subscribe(
      () => fail('should have failed with the 401 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(401);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
      }
    );

    const httpRequest = httpTestingController.expectOne('/api/data');
    httpRequest.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });
});
