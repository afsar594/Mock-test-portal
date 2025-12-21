import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeltsListeningComponent } from './ielts-listening.component';

describe('IeltsListeningComponent', () => {
  let component: IeltsListeningComponent;
  let fixture: ComponentFixture<IeltsListeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IeltsListeningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeltsListeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
