/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RubroBancoComponent } from './rubro-banco.component';

describe('RubroBancoComponent', () => {
  let component: RubroBancoComponent;
  let fixture: ComponentFixture<RubroBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubroBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubroBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
