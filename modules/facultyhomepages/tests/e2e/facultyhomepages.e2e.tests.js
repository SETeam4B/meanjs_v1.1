'use strict';

describe('Facultyhomepages E2E Tests:', function () {
  describe('Test Facultyhomepages page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/facultyhomepages');
      expect(element.all(by.repeater('facultyhomepage in facultyhomepages')).count()).toEqual(0);
    });
  });
});
