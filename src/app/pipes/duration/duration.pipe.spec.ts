import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });

  it('should show hrs and mins based on given input', ()=>{
    let durationPipe = new DurationPipe();
    expect(durationPipe.transform(1000)).toEqual('16 hrs 40 mins');
  });

  it('should show hr and mins based on given input', ()=>{
    let durationPipe = new DurationPipe();
    expect(durationPipe.transform(100)).toEqual('1 hr 40 mins');
  });

  it('should show mins based on given input', ()=>{
    let durationPipe = new DurationPipe();
    expect(durationPipe.transform(40)).toEqual('40 mins');
  });

});
