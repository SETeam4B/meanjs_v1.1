'use strict';

describe('Forms E2E Tests:', function () {
  describe('Test Forms page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/forms');
      expect(element.all(by.repeater('form in forms')).count()).toEqual(0);
    });
  });
});
