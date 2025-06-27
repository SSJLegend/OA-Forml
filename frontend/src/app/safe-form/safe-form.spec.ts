import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeForm } from './safe-form';

describe('SafeForm', () => {
  let component: SafeForm;
  let fixture: ComponentFixture<SafeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
