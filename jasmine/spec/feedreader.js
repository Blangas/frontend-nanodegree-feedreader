/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application. */
    describe('RSS Feeds', function() {
        /* Test makes sure that the allFeeds variable has been defined and
        * that it is not empty. */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
        * in the allFeeds object and ensures it has a URL defined
        * and that the URL is not empty. */
        it('URLs are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });


        /* Test that loops through each feed
        * in the allFeeds object and ensures it has a name defined
        * and that the name is not empty. */
        it('names are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    /* Test suite to test if menu hidding properly */
    describe('The menu', function() {
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('changes visibility on click', function() {
            const menuIcon = $('.menu-icon-link');

            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* Test suite ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container. */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('have at least 1 entry', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });
    });

    /* Test loads all feeds and checks if all them are different,
    because in Set can't be 2 same values */
    describe('New Feed Selection', function() {
        const feedSet = new Set([]);

        beforeEach(function(done) {
            loadFeed(0, function() {
                feedSet.add($('.feed').html());
                console.log(feedSet.size);
                loadFeed(1, function() {
                    feedSet.add($('.feed').html());
                    console.log(feedSet.size);
                    loadFeed(2, function() {
                        feedSet.add($('.feed').html());
                        console.log(feedSet.size);
                        done();
                    });
                });
            });
        });

        it('content actually changes', function(done) {
            /* I guess because of intermittent internet connection this test doesn't pass all the time.
            That is why I am keeping these logs to check if it goes in right order. */
            console.log(feedSet.size);
            expect(feedSet.size).toBe(3);
            done();
        });
    });
}());
