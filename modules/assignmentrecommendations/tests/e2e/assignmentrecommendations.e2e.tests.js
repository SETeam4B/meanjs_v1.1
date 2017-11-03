'use strict';

describe('Assignmentrecommendations E2E Tests:', function () {
  describe('Test Assignmentrecommendations page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/assignmentrecommendations');
      expect(element.all(by.repeater('assignmentrecommendation in assignmentrecommendations')).count()).toEqual(0);
    });
  });
});
