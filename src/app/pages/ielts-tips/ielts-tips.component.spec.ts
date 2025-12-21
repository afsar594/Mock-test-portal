import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeltsTipsComponent } from './ielts-tips.component';

describe('IeltsTipsComponent', () => {
  let component: IeltsTipsComponent;
  let fixture: ComponentFixture<IeltsTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IeltsTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeltsTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
