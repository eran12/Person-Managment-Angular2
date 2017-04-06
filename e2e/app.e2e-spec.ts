import { PersonManagmentPage } from './app.po';

describe('person-managment App', () => {
  let page: PersonManagmentPage;

  beforeEach(() => {
    page = new PersonManagmentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('pm works!');
  });
});
