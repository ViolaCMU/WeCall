angular.module('wecall.controllers', ['ionic'])

        .controller('DashCtrl', function($scope, $ionicPlatform, Contacts, ContactDB, GroupDB) {

            //_____________________new way
            //alert(Contacts.all()[0]);
            var allcontacts = Contacts.all();
            alert("are u there?1");
            $scope.loadcontacts = function() {
                alert("are u there?2");

                $scope.contacts = allcontacts;///////why cannot load in the function
            };

            for (var i = 0; i < allcontacts.length; i++) {
                //ContactDB.insert(allcontacts[i].id, allcontacts[i].displayName,allcontacts[i].phoneNumbers);
            }
        })

        .controller('FriendsCtrl', function($scope, Contacts, Friends, ContactDB) {

            Contacts.all(function(list) {
                var allcontacts = list;

                ContactDB.refresh(function() {
                    alert("db已清空");
                });
                $scope.loadcontacts = function() {
                    $scope.contacts = allcontacts;

                    for (var i = 0; i < allcontacts.length; i++) {
                        ContactDB.insert(allcontacts[i].id, allcontacts[i].displayName, allcontacts[i].phoneNumbers[0].value, function() {
                            ContactDB.selectall(function(list) {
                                $scope.friends = list;
                                //$scope.$digest();
                            });
                        });
                    }
                };
            });

            //alert("list all friends " + Friends.all());
//            $scope.friends = Friends.all();
//            $scope.loadcontacts = function() {
//                $scope.contacts = allcontacts;///////why cannot load in the function
//                //insert from contacts to ContactDB
//                //ContactDB.refresh();
//                for (var i = 0; i < allcontacts.length; i++) {
//                    ContactDB.insert(allcontacts[i].id, allcontacts[i].displayName, allcontacts[i].phoneNumbers[0].value);
//                }
//            };
        })

        .controller('FriendDetailCtrl', function($scope, $stateParams, ContactDB, GroupDB) {
            //alert($stateParams.friendId);

            ContactDB.selectbyid($stateParams.friendId, function(list) {
                $scope.friend = list[0];
                //alert($scope.friend);
                $scope.group = 0;
                alert($scope.group);
                var tag = $scope.group;
                alert(tag);
                GroupDB.create(function() {
                    alert("create success");
                    GroupDB.update(2, 2, function() {
                        alert("update success! " + GroupDB.select(2));
                    });
                    GroupDB.refresh(3, 3, function() {
                        alert("refresh success! " + GroupDB.select(3));
                    });
                });

            });



//            $scope.findContact = function(contactSearch) {
//                ContactService.find(contactSearch).then(function(contacts) {
//                    $scope.friend = contacts;
//                }, function(error) {
//                    console.log(error);
//                });
//            };
        })

        .controller('AccountCtrl', function($scope) {
        });

//改为使用service里面的Contacts来提供联系人服务
//        .directive('ngContacts', function(Order, Database) {
//            return {
//                restrict: 'A',
//                link: function(scope, elm, attrs, ctrl) {
//                    elm.on('click', function() {
//                        //navigator.contacts.create();
//
//                        var options = new ContactFindOptions();
//                        options.multiple = true;
//                        var each = ["displayName", "phoneNumbers"];
//                        navigator.contacts.find(each, function(foundcontacts) {
//                            scope.$apply(function() {
//                                scope.contacts = Order.setlist(foundcontacts);
//                                //alert(Order.getlist());
//
//                            });
//                        }, function(error) {
//                            scope.$apply(function() {
//                                alert('error: ' + error);
//                            });
//                        }, options);
//                    });
//                }
//            };
//        });

