(function (describe, it, beforeEach, module, inject, expect) {
    'use strict';

    describe('FLICKR_FORMATS unit test suite', function () {

        var FLICKR_FORMATS;

        // load app
        beforeEach(module('app'));

        // create and load mocks
        beforeEach(module(function ($provide) {

        }));

        // prepare test objects
        beforeEach(inject(function (_FLICKR_FORMATS_) {

            FLICKR_FORMATS = _FLICKR_FORMATS_;

        }));

        it('should be defined', function () {
            expect(FLICKR_FORMATS).toBeDefined();
        });


    });

})(window.describe, window.it, window.beforeEach, window.module, window.inject, window.expect);
