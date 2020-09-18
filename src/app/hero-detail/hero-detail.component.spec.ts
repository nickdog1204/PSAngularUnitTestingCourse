import {async, ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import {HeroDetailComponent} from './hero-detail.component';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../hero.service';
import {Location} from '@angular/common';
import {of} from 'rxjs/internal/observable/of';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

describe('HeroDetailComponent', () => {
  let mockActivatedRoute, mockHeroService, mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let SUT: HeroDetailComponent;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          }
        }
      }
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: HeroService, useValue: mockHeroService},
        {provide: Location, useValue: mockLocation},
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    SUT = fixture.componentInstance;
  });


  it(`should render the 'hero name' in a 'h2 tag'`, () => {
    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'super dude', strength: 6}));
    fixture.detectChanges();

    const h2DebugElement = fixture.debugElement.query(By.css('h2'));
    const h2Text = h2DebugElement.nativeElement.textContent;
    expect(h2Text).toContain('SUPER DUDE');
  });

  it(`should call 'heroService.updateHero' when 'save' is called (Basic Async)`, (done) => {
    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'super dude', strength: 6}));
    mockHeroService.updateHero.and.returnValue(of({}));

    fixture.componentInstance.save();


    setTimeout(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
      done();
    }, 300);


  });
  it(`should call 'heroService.updateHero' when 'save' is called (fakeAsync)`, fakeAsync(() => {
    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'super dude', strength: 6}));
    mockHeroService.updateHero.and.returnValue(of({}));

    fixture.componentInstance.save();
    // tick(260);
    flush();


    expect(mockHeroService.updateHero).toHaveBeenCalled();


  }));

  it(`should call heroService.updateHero when 'save' is called (async)`, async(() => {
    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'super dude', strength: 6}));
    mockHeroService.updateHero.and.returnValue(of({}));

    fixture.componentInstance.saveAsync();

    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    });

  }));
});
