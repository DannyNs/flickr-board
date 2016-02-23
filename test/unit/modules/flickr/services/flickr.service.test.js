(function (describe, it, beforeEach, module, inject, expect, jasmine, _, spyOn) {
    'use strict';

    describe('flickrService unit test suite', function () {

        var $rootScope, $q, flickrService, originalPhotos, photos, keys, localStorageService, flickrRepository, deferred;

        // load app
        beforeEach(module('app'));

        // create and load mocks
        beforeEach(module(function ($provide) {
            jasmine.getFixtures().fixturesPath = "/base/test/unit/fixtures/";
            originalPhotos = JSON.parse(readFixtures('original_photos.json'));
            photos = JSON.parse(readFixtures('photos.json'));
            keys = _.keys(photos);
        }));

        // prepare test objects
        beforeEach(inject(function (_$rootScope_, _$q_, _flickrService_, _localStorageService_, _flickrRepository_) {

            $q = _$q_;
            $rootScope = _$rootScope_;
            flickrService = _flickrService_;
            localStorageService = _localStorageService_;
            flickrRepository = _flickrRepository_;

            deferred = $q.defer();
            spyOn(flickrRepository, 'getPublicPhotos').and.returnValue(deferred.promise);
            spyOn(localStorageService, 'set');
            spyOn(localStorageService, 'remove');
        }));

        it('should be defined', function () {
            expect(flickrService).toBeDefined();
        });

        it('should get public photos', function () {
            var resolvedValue;
            flickrService.getPublicPhotos().then(function(data) {resolvedValue = data;});
            deferred.resolve({data: originalPhotos}); 
            $rootScope.$digest();
            expect(flickrRepository.getPublicPhotos).toHaveBeenCalled();
            expect(resolvedValue).toBeDefined();
        });

        it('should not get public photos', function () {
            var resolvedValue;
            flickrService.getPublicPhotos().then(function(data) {resolvedValue = data;});
            deferred.reject({data: originalPhotos}); 
            $rootScope.$digest();
            expect(flickrRepository.getPublicPhotos).toHaveBeenCalled();
            expect(resolvedValue).not.toBeDefined();            
        });
        
        it('should toggle photo status', function () {
            var photo = photos[keys[0]];  
            // fill service with photos
            flickrService.getPublicPhotos();
            deferred.resolve({data: originalPhotos}); 
            $rootScope.$digest();

            // test select photo
            flickrService.togglePhotoActive(photo); 
            expect(localStorageService.set).toHaveBeenCalled();
            
            // test remove select
            flickrService.togglePhotoActive(photo); 
            expect(localStorageService.remove).toHaveBeenCalled();
        });        

        
        it('should throw exception', function () {
            var photo = photos[keys[0]];  

            // test select photo exception
            expect(function(){ flickrService.togglePhotoActive(photo); }).toThrow("Photo do not exists");
        });  

    });

})(window.describe, window.it, window.beforeEach, window.module, window.inject, window.expect, window.jasmine, window._, window.spyOn);
