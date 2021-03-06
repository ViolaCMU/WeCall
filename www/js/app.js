
angular.module('wecall', ['ionic', 'wecall.controllers', 'wecall.services'])

        .run(function($ionicPlatform) {
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
                //Push.initialize();
                //alert("PushProcessingService is initialized");
            });
        })

        .config(function($stateProvider, $urlRouterProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider

                    // setup an abstract state for the tabs directive
                    .state('tab', {
                        url: "/tab",
                        abstract: true,
                        templateUrl: "templates/tabs.html"
                    })

                    // Each tab has its own nav history stack:

                    .state('tab.dash', {
                        url: '/dash',
                        views: {
                            'tab-dash': {
                                templateUrl: 'templates/tab-dash.html',
                                controller: 'DashCtrl'
                            }
                        }
                    })

                    .state('tab.friends', {
                        url: '/friends',
                        views: {
                            'tab-friends': {
                                templateUrl: 'templates/tab-friends.html',
                                controller: 'FriendsCtrl'
                            }
                        }
                    })
                    
                    .state('tab.friend-detail', {
                        url: '/friend/:friendId',
                        views: {
                            'tab-friends': {
                                templateUrl: 'templates/friend-detail.html',
                                controller: 'FriendDetailCtrl'
                            }
                        }
                    })

                    .state('tab.groups', {
                        url: '/groups',
                        views: {
                            'tab-groups': {
                                templateUrl: 'templates/tab-groups.html',
                                controller: 'GroupsCtrl'
                            }
                        }
                    })
                    .state('tab.group-detail', {
                        url: '/group/:groupId',
                        views: {
                            'tab-groups': {
                                templateUrl: 'templates/group-detail.html',
                                controller: 'GroupDetailCtrl'
                            }
                        }
                    });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/tab/dash');

        });

