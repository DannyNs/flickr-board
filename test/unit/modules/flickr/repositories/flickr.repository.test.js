(function (describe, it, beforeEach, module, inject, expect, jasmine) {
    'use strict';

    describe('flickrRepository unit test suite', function () {

        var $httpBackend, CONFIG, FLICKR_FORMATS, flickrRepository, photos;

        // load app
        beforeEach(module('app'));

        // create and load mocks
        beforeEach(module(function ($provide) {
            jasmine.getFixtures().fixturesPath = "/base/test/unit/fixtures/";
            photos = JSON.parse(readFixtures('photos.json'));
        }));

        // prepare test objects
        beforeEach(inject(function (_$httpBackend_, _CONFIG_, _FLICKR_FORMATS_, _flickrRepository_) {
            
            $httpBackend = _$httpBackend_;
            CONFIG = _CONFIG_;
            FLICKR_FORMATS = _FLICKR_FORMATS_;
            flickrRepository = _flickrRepository_;

        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should be defined', function () {
            expect(flickrRepository).toBeDefined();
        });

        it('should get all photos' , function() {    
            $httpBackend.expectJSONP(CONFIG.api + 'services/feeds/photos_public.gne?format=' + FLICKR_FORMATS.JSON + 
                                '&jsoncallback=JSON_CALLBACK').respond(200, photos);
                        
            var promise = flickrRepository.getPublicPhotos();           
            $httpBackend.flush();
            
            promise.then(function(result) {
               expect(result.data).toEqual(photos); 
            });
        });

    });

})(window.describe, window.it, window.beforeEach, window.module, window.inject, window.expect, window.jasmine);