import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatePapoPage } from './bate-papo.page';

describe('BatePapoPage', () => {
  let component: BatePapoPage;
  let fixture: ComponentFixture<BatePapoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatePapoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatePapoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
