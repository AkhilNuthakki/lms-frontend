import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/services/user/user.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [HttpClientTestingModule],
      providers: [ UserService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show navigation links when authenticated', () => {
    component.isAuth = true;
    fixture.detectChanges();
    const list = fixture.nativeElement.querySelector('li');
    expect(list.textContent).toContain('Find Course');
  });

  it('should hide navigation links when not authenticated', () => {
    component.isAuth = false;
    fixture.detectChanges();
    const list = fixture.nativeElement.querySelector('li');
    expect(list).not.toContain('Find Course');
  });
});
