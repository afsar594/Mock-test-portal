import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeltsWritingComponent } from './ielts-writing.component';

describe('IeltsWritingComponent', () => {
  let component: IeltsWritingComponent;
  let fixture: ComponentFixture<IeltsWritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IeltsWritingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeltsWritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
