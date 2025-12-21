import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeltsSpeakingComponent } from './ielts-speaking.component';

describe('IeltsSpeakingComponent', () => {
  let component: IeltsSpeakingComponent;
  let fixture: ComponentFixture<IeltsSpeakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IeltsSpeakingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeltsSpeakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
