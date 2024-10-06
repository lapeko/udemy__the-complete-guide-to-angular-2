import { ServersFilterPipe } from './servers-filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ServersFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
