(function (describe, it, beforeEach, module, inject, expect) {
    'use strict';

    describe('TAG_NAMES unit test suite', function () {

        var TAG_NAMES;

        // load app
        beforeEach(module('app'));

        // create and load mocks
        beforeEach(module(function ($provide) {

        }));

        // prepare test objects
        beforeEach(inject(function (_TAG_NAMES_) {

            TAG_NAMES = _TAG_NAMES_;

        }));

        it('should be defined', function () {
            expect(TAG_NAMES).toBeDefined();
        });


    });

})(window.describe, window.it, window.beforeEach, window.module, window.inject, window.expect);
