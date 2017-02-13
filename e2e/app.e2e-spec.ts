import { GastosPage } from './app.po';

describe('gastos App', function() {
  let page: GastosPage;

  beforeEach(() => {
    page = new GastosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
