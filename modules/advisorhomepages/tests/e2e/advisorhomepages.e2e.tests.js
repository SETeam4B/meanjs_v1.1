'use strict';

describe('Advisorhomepages E2E Tests:', function () {
  describe('Test Advisorhomepages page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/advisorhomepages');
      expect(element.all(by.repeater('advisorhomepage in advisorhomepages')).count()).toEqual(0);
    });
  });
});
