'use strict';

describe('Service: exampleService', function () {

  // load the service's module
  beforeEach(module('guiApp'));

  // instantiate service
  var exampleService;
  beforeEach(inject(function (_exampleService_) {
    exampleService = _exampleService_;
  }));

  it('should do something', function () {
    expect(!!exampleService).toBe(true);
  });

});
