(function (describe, it, beforeEach, module, inject, expect) {
    'use strict';

    describe('flickrImageValue unit test suite', function () {

        var flickrImageValue;

        // load app
        beforeEach(module('app'));

        // create and load mocks
        beforeEach(module(function ($provide) {

        }));

        // prepare test objects
        beforeEach(inject(function (_flickrImageValue_) {

            flickrImageValue = _flickrImageValue_;

        }));

        it('should be defined', function () {
            expect(flickrImageValue).toBeDefined();
        });


    });

})(window.describe, window.it, window.beforeEach, window.module, window.inject, window.expect);
