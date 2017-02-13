/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RubroBancoAddComponent } from './rubro-banco-add.component';

describe('RubroBancoAddComponent', () => {
  let component: RubroBancoAddComponent;
  let fixture: ComponentFixture<RubroBancoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubroBancoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubroBancoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
