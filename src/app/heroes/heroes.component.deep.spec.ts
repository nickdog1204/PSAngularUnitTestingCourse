import {HeroesComponent} from './heroes.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {Component, Directive, HostListener, Input, NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs/internal/observable/of';
import {By} from '@angular/platform-browser';
import {HeroComponent} from '../hero/hero.component';

@Directive({
  selector: '[routerLink]',
})
export class RouterLinkDirectiveStub {
  @Input('routerLink')
  linksParams: any;

  navigatedTo: any = null;


  @HostListener('click', ['$event'])
  onClick() {
    this.navigatedTo = this.linksParams;
  }

}

describe('HeroesComponent (deep tests)', () => {
  let SUT: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES: Hero[];
  let heroService: HeroService;


  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'Magnetic Dude', strength: 55},
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [
        {provide: HeroService, useValue: mockHeroService},
        // {provide: HttpClient, useValue: {}},
        // {provide: MessageService, useValue: {}},
        // HeroService
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);

  });

  it('should render each Hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponentDebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDebugElements.length).toEqual(3);
    expect(heroComponentDebugElements[0].componentInstance.hero.name).toEqual('SpiderDude');
    expect(heroComponentDebugElements[1].componentInstance.hero.name).toEqual('Wonderful Woman');
    expect(heroComponentDebugElements[2].componentInstance.hero.name).toEqual('Magnetic Dude');
  });


  // Section 6 Testing DOM interactions & Routing Components
  it(`should call heroService.deleteHero when HeroComponents' delete button is clicked`, () => {
    const deleteSpy = spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // call ngOnInit
    fixture.detectChanges();


    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[0].query(By.css('button'))
      .triggerEventHandler('click', {
        stopPropagation: () => {
        }
      });

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`should call heroService.deleteHero(hero) when HeroComponents' delete button is clicked (through EventEmitter)`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // (heroComponents[0].componentInstance as HeroComponent).delete.emit();
    heroComponents[0].triggerEventHandler('delete', {});

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });


  it(`should add a 'new hero' to the 'hero list' when the 'add button' is clicked`, () => {
    // Arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = 'Mr.ICE';
    const newHero: Hero = {id: 6, name, strength: 6};
    mockHeroService.addHero.and.returnValue(of(newHero));
    const inputElement = fixture.debugElement.query(By.css('input'));
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    // Act
    inputElement.nativeElement.value = name;
    addButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    // Assert
    const text = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(text).toContain(name);

  });
  it(`should have the correct route upon clicking the first hero`, () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();


    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    const routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);
    heroComponents[0].query(By.css('a')).triggerEventHandler('click', {});
    expect(routerLink.navigatedTo).toEqual('/detail/1');

  });

});
