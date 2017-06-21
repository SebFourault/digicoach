import { DigicoachPage } from './app.po';

describe('digicoach App', () => {
  let page: DigicoachPage;

  beforeEach(() => {
    page = new DigicoachPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
