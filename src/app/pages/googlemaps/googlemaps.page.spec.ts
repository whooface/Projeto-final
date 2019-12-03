import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglemapsPage } from './googlemaps.page';

describe('GooglemapsPage', () => {
  let component: GooglemapsPage;
  let fixture: ComponentFixture<GooglemapsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GooglemapsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglemapsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
