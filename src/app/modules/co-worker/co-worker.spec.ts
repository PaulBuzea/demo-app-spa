import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorker } from './co-worker';

describe('CoWorker', () => {
  let component: CoWorker;
  let fixture: ComponentFixture<CoWorker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoWorker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoWorker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
