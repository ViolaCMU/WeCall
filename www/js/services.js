function onGCMNotification(e) {
    alert("in the onGCM");
    switch (e.event)
    {
        case 'registered':
            if (e.regid.length > 0)
            {
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                alert("regID = " + e.regid);
                document.getElementById("aaaa").value = e.regid;
            }
            break;
        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            alert("in message");
            if (e.foreground)
            {
                alert("message_foreground");

                // on Android soundname is outside the payload.
                // On Amazon FireOS all custom attributes are contained within payload
//                var soundfile = e.soundname || e.payload.sound;
                // if the notification contains a soundname, play it.
//                var my_media = new Media("/android_asset/www/" + soundfile);
//                my_media.play();
            }
            else
            {  // otherwise we were launched because the user touched a notification in the notification tray.
                alert("message_background");
                if (e.coldstart)
                {
                    alert("message_background:coldstart");
                    window.location.assign("/friend/e.payload.message");
                }
                else
                {
                    alert("message_background");
                    window.location.assign("/friend/e.payload.message");
                }
            }
            break;
        case 'error':
            break;
        default:
            break;
    }
}
angular.module('wecall.services', [])

//        .factory('Friends', function() {
//            // Might use a resource here that returns a JSON array
//            // Some fake testing data
//            var friends = [
////                {id: 0, name: 'Scruff McGruff'},
////                {id: 1, name: 'G.I. Joe'},
////                {id: 2, name: 'Miss Frizzle'},
////                {id: 3, name: 'Ash Ketchum'}
//            ];
//            return {
//                all: function() {
//                    return friends;
//                },
//                get: function(ID) {
//                    // Simple index lookup
//                    for (var i = 0; i < friends.length; i++) {
//                        if (friends[i].id == ID) {
//                            return friends[i];
//                        }
//                    }
//                },
//                add: function(id, name, number) {
//                    friends.push({id: id, name: name, number: number});
//                },
//                clear: function() {
//                    friends = [];
//                }
//            };
//        })
        .factory("Push", function() {
            var registerId;

            function onDeviceReady() {
                // alert("Device Ready");
                alert('NOTIFY  Device is ready.  Registering with GCM server');
                //register with google GCM server
                var pushNotification = window.plugins.pushNotification;
                pushNotification.register(
                        successHandler,
                        errorHandler,
                        {
                            "senderID": "728838277781",
                            "ecb": "onGCMNotification"
                        });

                function successHandler(result) {
                    alert('result = ' + result);
                }
                function errorHandler(error) {
                    alert('error = ' + error);
                }
            }
            return{
                initialize: function() {
                    document.addEventListener('deviceready', onDeviceReady, false);
                },
                setRegisterId: function(id) {
                    registerId = id;
                },
                //unregister can be called from a settings area.
                unregister: function() {
                    alert('unregister');
                    var push = window.plugins.pushNotification;
                    if (push) {
                        push.unregister(function() {
                            alert('unregister success');
                        });
                    }
                },
                getRegisterId: function() {
                    return registerId;
                }
            };

        })

        .factory("ContactService", function($rootScope, $q) {
            return {
                create: function() {
                    return navigator.contacts.create();
                },
                find: function(filter) {

                }
            };
        })

        .factory('Order', function() {
            var list = ["aaa"];
            return{
                getlist: function() {
                    return list;
                },
                setlist: function(_list) {
                    list = _list;
                    return list;
                }
            };
        })
        .factory('Contacts', function() {
            var foundcontacts;
            return{
                all: function(callback) {

                    document.addEventListener("deviceready", onDeviceReady, false);
                    function onDeviceReady() {
                        // find all contacts with 'Bob' in any name field
                        var options = new ContactFindOptions();
                        options.filter = "";
                        options.multiple = true;
                        var fields = ["id", "displayName", "phoneNumbers"];
                        navigator.contacts.find(fields, onSuccess, onError, options);
                    }
                    function onSuccess(results) {
                        for (var i = 0; i < results.length; i++) {
                            //alert("终于成功了！Display Name = " + contacts[i].displayName);
                        }
                        if (callback && typeof callback == 'function') {
                            callback(results);
                        }
                        //foundcontacts = results; //看看用不用调用onSuccess

                    }
                    function onError(contactError) {
                        alert('onError!');
                    }

                    //return foundcontacts;
                }
            };
        })
//        })
        .factory('ContactDB', function(Friends) {
            var db;
            return{
                exists: function() {
                    return db;
                },
                insert: function(id, name, number, callback) {
                    db.transaction(function(tx) {
                        tx.executeSql('INSERT INTO CONTACTS (id, name, number) VALUES (?,?,?)', [id, name, number], function() {
                            if (callback && typeof callback == 'function') {
                                callback();
                            }
                        });
                    });
                },
                refresh: function(callback) {
                    db.transaction(function(tx) {
                        tx.executeSql("DELETE FROM CONTACTS", function() {
                            if (callback && typeof callback == 'function') {
                                callback();
                            }
                        });
                    });
                },
                selecttag: function(tag) {
                    var msg;
                    db.transaction(function(tx) {
                        tx.executeSql('SELECT * FROM CONTACTS WHERE tag = ? ', [tag], function(tx, results) {
                            alert(results.rows.item(0).name + "@@@" + results.rows.item(0).id);
                            var len = results.rows.length, i;
                            msg = "<p>Found rows: " + len + "</p>";
                            document.querySelector('#status').innerHTML += msg;
                            alert("i'm out of for");
                            for (i = 0; i < len; i++) {
                                //alert("i'm in for");
                                //alert(results.rows.item(i).id + ":" + results.rows.item(i).name + results.rows.item(i).number + results.rows.item(i).tag + "");
                            }
                        }, null);
                    });
                },
                selectbyid: function(ID, callback) {
                    db.transaction(function(tx) {
                        tx.executeSql('SELECT * FROM CONTACTS WHERE id = ?', [ID], function(tx, results) {
                            var r = [];
                            var len = results.rows.length, i;
                            for (i = 0; i < len; i++) {
                                r.push({
                                    id: results.rows.item(i).id,
                                    name: results.rows.item(i).name,
                                    number: results.rows.item(i).number,
                                    tag: 0
                                });
                            }
                            if (callback && typeof callback == 'function') {
                                callback(r);
                            }
                        }, null);
                    });
                },
                selectall: function(callback) {

                    db.transaction(function(tx) {

                        tx.executeSql('SELECT * FROM CONTACTS', [], function(tx, results) {
                            var len = results.rows.length, i;
//                            msg = results.rows.item(i).displayName;
//                            document.querySelector('#contactlist').innerHTML += msg;
                            var r = [];
                            //Friends.clear();
                            for (i = 0; i < len; i++) {
                                //Friends.add(results.rows.item(i).id, results.rows.item(i).name, results.rows.item(i).number);
                                r.push({
                                    id: results.rows.item(i).id,
                                    name: results.rows.item(i).name,
                                    number: results.rows.item(i).number,
                                    tag: 0
                                });
                            }
//                            alert(Friends.all());
                            if (callback && typeof callback == 'function') {
                                callback(r);
                            }

                        }, null);
                    });
                },
                open: function() {

                    db = openDatabase('mydb', '1.0', 'Contacts DB', 2 * 1024 * 1024);
                    return db;
                },
                create: function() {
                    //alert("i'm contact table!");
                    db.transaction(function(tx) {
                        tx.executeSql('CREATE TABLE IF NOT EXISTS CONTACTS (id unique, name TEXT, number TEXT)');
                    });
                }
            }

        })
        .factory('GroupDB', ["ContactDB", function(ContactDB) {
                var db = ContactDB.open();
                return{
                    create: function(callback) {
                        db.transaction(function(tx) {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS GROUPS (id unique, tag TEXT)', [], function() {
                                if (callback && typeof callback == 'function') {
                                    callback();
                                }
                            });

                        });
                    },
                    update: function(ID, newTag, callback) {
                        db.transaction(function(tx) {
                            tx.executeSql('UPDATE GROUPS SET tag = ?', [newTag], 'WHERE id = ?', [ID], function() {

                                if (callback && typeof callback == 'function') {
                                    callback();
                                }

                            });


                        });
                    },
                    refresh: function(thisid, newtag, callback) {

                        db.transaction(function(tx) {

                            tx.executeSql('IF EXISTS(SELECT * FROM GROUPS WHERE id = ?)', [thisid], 'BEGIN \n\
UPDATE GROUPS SET tag = ?', [newtag], 'WHERE id = ?', [thisid], 'END ELSE INSERT INTO GROUPS VALUES (?,?)', [thisid, newtag], function() {
                                if (callback && typeof callback == 'function') {
                                    callback();
                                }
                            });

                        });
                    },
                    select: function(tag) {
                        var msg;
                        alert("am i in select?");
                        alert(msg);
                        db.transaction(function(tx) {
                            alert("am i in select transaction?"); //两次
                            tx.executeSql('SELECT * FROM GROUPS WHERE tag = ? ', [tag], function(tx, results) {
                                alert(results.rows.item(0).tag + "@@@" + results.rows.item(0).id);
                                var len = results.rows.length, i;
                                msg = "<p>Found rows: " + len + "</p>";
                                document.querySelector('#status').innerHTML += msg;
                                alert("i'm out of for");
                                for (i = 0; i < len; i++) {
                                    alert(len);
                                    //alert(results.rows.item(i).id + ":" + results.rows.item(i).name + results.rows.item(i).number + results.rows.item(i).tag + "");
                                }
                            }, null);
                        });
                    },
                    insert: function() {
                        db.transaction(function(tx) {
                            alert("i'm in insert"); //OK 两次
                            tx.executeSql('INSERT INTO GROUPS (id, tag) VALUES (23,0),(24,1),(25,2),(26,3),(27,4)');
                            tx.executeSql('SELECT * FROM GROUPS', [], function(tx, results) {
                                alert(results.rows.item(0).tag + "@@@" + results.rows.item(0).id);
                            }, null);
                            alert(db.GROUPS); // undefined
                            alert("到这里了没有啊。。。"); //OK
                            //tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")');
                        });
                    }
                };
            }]
                );


        