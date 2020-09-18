import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroesComponent} from './heroes.component';
import {Component, Input, NO_ERRORS_SCHEMA} from '@angular/core';
import {HeroService} from '../hero.service';
import {Hero} from '../hero';
import {of} from 'rxjs/internal/observable/of';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../message.service';
import {By} from '@angular/platform-browser';

describe('HeroesComponent (shallow tests)', () => {
  let SUT: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES: Hero[];
  let heroService: HeroService;

  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class FakeHeroComponent {
    @Input()
    hero: Hero;
  }


  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'Spiderdude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'Magnetic Dude', strength: 55},
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [
        {provide: HeroService, useValue: mockHeroService},
        // {provide: HttpClient, useValue: {}},
        // {provide: MessageService, useValue: {}},
        // HeroService
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);
    // heroService = TestBed.get(HeroService);

  });

  it('should set hero list correctly as returned from the service.getHeroes()', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // spyOn(heroService, 'getHeroes').and.returnValue(of(HEROES));
    fixture.detectChanges();
    expect(fixture.componentInstance.heroes).toEqual(HEROES);
  });

  it('should render the same number of "app-hero" as the length of "heroes"', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const appHeroes = fixture.debugElement.queryAll(By.css('app-hero'));

    expect(appHeroes.length).toEqual(3);
  });
});
