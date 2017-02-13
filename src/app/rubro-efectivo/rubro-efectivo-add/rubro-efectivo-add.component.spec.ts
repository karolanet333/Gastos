/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RubroEfectivoAddComponent } from './rubro-efectivo-add.component';

describe('RubroEfectivoAddComponent', () => {
  let component: RubroEfectivoAddComponent;
  let fixture: ComponentFixture<RubroEfectivoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubroEfectivoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubroEfectivoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
