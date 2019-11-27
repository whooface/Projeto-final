import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddogPage } from './adddog.page';

describe('AdddogPage', () => {
  let component: AdddogPage;
  let fixture: ComponentFixture<AdddogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddogPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
