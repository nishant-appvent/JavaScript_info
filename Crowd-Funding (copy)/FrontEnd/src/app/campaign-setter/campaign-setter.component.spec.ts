import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSetterComponent } from './campaign-setter.component';

describe('CampaignSetterComponent', () => {
  let component: CampaignSetterComponent;
  let fixture: ComponentFixture<CampaignSetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignSetterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
