/**
 * Created by liuzhe on 16/3/13.
 */

var app = angular.module("sampleApp", ["firebase"]);

app.controller("SampleCtrl", function ($scope,
                                       $firebaseObject,
                                       $firebaseArray,
                                       $firebaseAuth) {
    var ref = new Firebase("https://glowing-fire-3217.firebaseio.com");

    //var auth = $firebaseAuth(ref);
    //
    //auth.$authWithOAuthPopup("google").then(
    //    function(data) {
    //      console.log("auth id is :", data.uid);
    //    }
    //).catch(function(e){
    //  console.log(e);
    //})

    console.log("root key is :", ref.key());
    // download the data into a local object
    //var data = $firebaseObject(ref.child("data"));

    $scope.data = $firebaseObject(ref.child("data"));
    //console.log("data is :", data);

    $scope.messages = $firebaseArray(ref.child("messages"));


    console.log("messages key is :", ref.child("messages").key());


    $scope.addMessage = function () {

        var currentTime = new Date();

        var dates = currentTime.toLocaleTimeString();

        $scope.messages.$add({
            text: $scope.newMessage,
            time: dates
        });
        console.log("add data is :", $scope.messages)
        $scope.newMessage = '';
    }

    $scope.saveMessage = function (message) {

        console.log("update message is :", message);

        var currentTime = new Date();

        var dates = currentTime.toLocaleTimeString();

        var id1 = message.$id;

        //$scope.messages.child(id1).set({
        ref.child("messages").child(id1).set({
                text: message.text,
                time: dates
        });
        console.log("add data is :", $scope.messages)
        $scope.newMessage = '';
    }

});