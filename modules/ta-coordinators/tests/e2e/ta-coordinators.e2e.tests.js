'use strict';

describe('Ta coordinators E2E Tests:', function () {
  describe('Test Ta coordinators page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/ta-coordinators');
      expect(element.all(by.repeater('ta-coordinator in ta-coordinators')).count()).toEqual(0);
    });
  });
});
