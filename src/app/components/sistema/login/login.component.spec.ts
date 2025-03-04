import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockUserService = jasmine.createSpyObj('UserService', ['login', 'addToken', 'addUser']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /professor/salas on successful login', fakeAsync(() => {
    const mockUser: User = { id:1, username: 'testuser', password: 'testpassword', token: 'testtoken', role: 'admin' };

    mockUserService.login.and.returnValue(of(mockUser));

    component.logar();
    tick();

    expect(mockUserService.addToken).toHaveBeenCalledWith('testtoken');
    expect(mockUserService.addUser).toHaveBeenCalledWith(mockUser);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/professor/salas']);
  }));

  it('should set showError to true on login error', fakeAsync(() => {
    mockUserService.login.and.returnValue(throwError('Test error'));

    component.logar();
    tick();

    expect(component.showError).toBeTrue();
  }));
});
