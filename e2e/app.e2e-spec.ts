import { TokenERC201Page } from './app.po';

describe('token-erc201 App', () => {
  let page: TokenERC201Page;

  beforeEach(() => {
    page = new TokenERC201Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
