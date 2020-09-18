import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroComponent} from './hero.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('HeroComponent (shallow tests)', () => {
  let SUT: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroComponent);
    SUT = fixture.componentInstance;
  });

  it('should have the correct hero', () => {
    SUT.hero = {
      id: 1,
      name: 'SuperDude',
      strength: 3
    };

    expect(SUT.hero.name).toEqual('SuperDude');
  });

  it('should render the hero name in an anchor tag', () => {
    SUT.hero = {
      id: 1,
      name: 'SuperDude',
      strength: 3
    };
    fixture.detectChanges();

    const debugEl = fixture.debugElement.query(By.css('a'));

    expect(debugEl.nativeElement.textContent).toContain('SuperDude');

  });

});
