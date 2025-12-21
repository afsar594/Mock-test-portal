import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeltsReadingComponent } from './ielts-reading.component';

describe('IeltsReadingComponent', () => {
  let component: IeltsReadingComponent;
  let fixture: ComponentFixture<IeltsReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IeltsReadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeltsReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
