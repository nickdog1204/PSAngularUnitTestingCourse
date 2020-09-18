import {HeroesComponent} from './heroes.component';
import {of} from 'rxjs/internal/observable/of';

describe('HeroesComponent', () => {
  let SUT: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'Spiderdude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'Magnetic Dude', strength: 55},
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    SUT = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {

    it('should remove the indicated hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(null));
      SUT.heroes = HEROES;
      const hero = {id: 2, name: 'Wonderful Woman', strength: 24};

      SUT.delete(hero);

      expect(SUT.heroes.length).toBe(2);

    });

    it('should call the "deleteHero(hero)" method on "HeroService" with the "right param hero"', () => {
      // Arrange
      const deleteHeroSpy = mockHeroService.deleteHero.and.returnValue(of(null));
      SUT.heroes = HEROES;
      const hero = {id: 2, name: 'Wonderful Woman', strength: 24};

      // Act
      SUT.delete(hero);


      // Assert
      expect(deleteHeroSpy).toHaveBeenCalledWith({id: 2, name: 'Wonderful Woman', strength: 24});

    });

    it('should call the "deleteHero(hero)" method on "HeroService" exactly once', () => {
      // Arrange
      const deleteHeroSpy = mockHeroService.deleteHero.and.returnValue(of('okok'));
      SUT.heroes = HEROES;
      const hero = {id: 2, name: 'Wonderful Woman', strength: 24};

      // Act
      SUT.delete(hero);

      // Assert
      expect(mockHeroService.deleteHero).toHaveBeenCalledTimes(1);

    });
  });
});
