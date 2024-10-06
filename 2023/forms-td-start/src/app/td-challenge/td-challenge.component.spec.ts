import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdChallengeComponent } from './td-challenge.component';

describe('TdChallengeComponent', () => {
  let component: TdChallengeComponent;
  let fixture: ComponentFixture<TdChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdChallengeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TdChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
