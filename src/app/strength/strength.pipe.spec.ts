import {StrengthPipe} from './strength.pipe';

describe('StrengthPipe', () => {
  it('should display weak if strength is 5', () => {
    const pipe = new StrengthPipe();

    const value = pipe.transform(5);

    expect(value).toEqual('5 (weak)');
  });

  it('should display strong if strength is 12', () => {
    const pipe = new StrengthPipe();

    const val = pipe.transform(12);

    expect(val).toEqual('12 (strong)');
  });
});
