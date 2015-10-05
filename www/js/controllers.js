var authenURL = "http://192.168.1.65/api/v1/person/"; // Will need to use dynamic server IP
var ServiceURL = 'http://192.168.1.65/api/v1/fileservice/';

angular.module('vida.controllers', ['ngCordova.plugins.camera'])

//TODO: Abstract controllers to separate tabs/functionalities (each tab gets it's own controller?)

.controller('loginCtrl', function($scope, $location, $http){
  $scope.credentials = {};
  $scope.login = function(url) {
    // Request authorization
    // TODO: Check Better (Username or pass is wrong) + Individually check username/password
    if (($scope.credentials.username !== undefined) && ($scope.credentials.password !== undefined)) {
      var authentication = btoa($scope.credentials.username + ":" + $scope.credentials.password);
      var config = {};
      config.headers = {};
      if (authentication !== null){
        config.headers.Authorization = 'Basic ' + authentication;
      } else {
        config.headers.Authorization = '';
      }

      $http.get(authenURL, config).then(function(xhr) {
        if (xhr.status === 200){
          // Success!
          // Can go directly to '/tabs' instead of url
          $location.path(url);
        } else if (xhr.status === 401){
          alert("Incorrect Username or Password!");
        } else {
          alert(xhr.status);
        }
      });
    } else {
      alert("Username/Password Undefined");
    }
    $location.path(url); // debug so don't need to login
  };
})

.controller('createCtrl', function($scope, $cordovaBarcodeScanner, uploadService, $location, $http, $cordovaCamera, $ionicModal){
  // Declarations
  $scope.person = {};
  $scope.peopleInShelter = [];

  // Initial Values
  $scope.person.gender = "--Choose Gender--";

  $ionicModal.fromTemplateUrl('Camera_Modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.CameraChooseModal = modal;
    $scope.CameraChooseModal.hide();
  });

  // Functions
  $scope.logout = function(url) {
    // Request logout?

    // Can go directly to /login'
    $location.path(url);
  };

  $scope.scanBarcode = function() {
    $cordovaBarcodeScanner.scan().then(function(barcodeData){
        // Success!
        alert("Barcode Data Retrieved:\nFormat: " + barcodeData.format + "\nCode: " + barcodeData.text);
    }, function(error){
        // Error!
    });
  };

  $scope.getPeopleList = function() {

    var authentication = btoa("admin:admin"); //Temporary, will need to use previous credentials
    var config = {};
    config.headers = {};
    if (authentication !== null) {
      config.headers.Authorization = 'Basic ' + authentication;
    } else {
      config.headers.Authorization = '';
    }

    $http.get(authenURL, config).then(function(xhr) {
      if (xhr.status === 200) {
        if (xhr.data !== null) {
          for (var i = 0; i < xhr.data.objects.length; i++) {
            var personOnServer = xhr.data.objects[i];

            // Check for duplicates (only names then ID so far)
            var duplicate = false;
            for (var j = 0; j < $scope.peopleInShelter.length; j++) {
              if ($scope.peopleInShelter[j].full_name === personOnServer.given_name){
                if ($scope.peopleInShelter[j].id === personOnServer.id){
                  duplicate = true;
                  break;
                }
              }
            }

            if (!duplicate) {
              personOnServer.full_name = personOnServer.given_name;  //TEMPORARY (just to show name in list)
              personOnServer.status = "On Server";  //TEMPORARY

              $scope.peopleInShelter.push(personOnServer);
            }
          }
        }
      }
    });
  };

  $scope.savePerson = function() {
    //TODO: Overhaul with fields
    var Name = $scope.person.fullName;
    var Address = $scope.person.address;
    var City = $scope.person.city;
    var DoB = $scope.person.date_of_birth;
    var Status = "Made Locally";

    var Gender = $scope.person.gender;
    if (Gender === "--Choose Gender--") {
      Gender = undefined;
    }

    var phoneNumber = $scope.person.phone_number;

    var Photo = null;
    if ($scope.person.photo !== undefined){
        Photo = $scope.person.photo;
    }

    var newPerson = [];
    newPerson.full_name = Name;
    newPerson.status = Status;
    newPerson.photo = Photo;
    newPerson.photo_filename = 'undefined';
    newPerson.id = $scope.peopleInShelter.length + 1;

    // TAKE CARE OF UNDEFINED

    // Check for local duplicates (only based on names so far)
    var duplicate = false;
    for (var i = 0; i < $scope.peopleInShelter.length; i++) {
        if ($scope.peopleInShelter[i].full_name === Name){
            duplicate = true;
            break;
        }
    }

    if (!duplicate) {

        // Upload person to fileService
        uploadService.uploadPhotoToUrl(newPerson.photo, ServiceURL, function(data) {
          // Success
          newPerson.photo_filename = data.name;

            uploadService.uploadPersonToUrl(newPerson, authenURL, function() {
                // Successful entirely

                // Re-get all people in array
                $scope.peopleInShelter = []; // Assign to a new empty array
                $scope.getPeopleList();

            }, function() {
                // Error uploading person
            });
        }, function() {
          // Error uploading photo
        });

    } else {
        alert("Person already exists!");
    }
  };

  $scope.showCameraModal = function() {
    $scope.CameraChooseModal.show();
  };

  $scope.closeCameraModel = function() {
    $scope.CameraChooseModal.hide();
  };

  $scope.takeCameraPhoto = function(source) {

    $scope.closeCameraModel();

    var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: source,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 250,
        targetHeight: 250,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.srcImage = "data:image/jpeg;base64," + imageData;
        $scope.person.photo = imageData;
    }, function(err) {
        // error
        alert("picture not taken: " + err);
    });
  };

  $scope.filterValues = function($event){
    var whichKey = $event.which;

    // 13 is 'return', 40 is '(', 41 is ')', 45 is '-'
    //    if this list gets any bigger, make array and iterate through for readability

    if( (isNaN(String.fromCharCode($event.keyCode))) ){
      if ((whichKey == 13 ||
           whichKey == 40 ||
           whichKey == 41 ||
           whichKey == 45)) {
        // don't remove key
      } else {
        // remove key
        $event.preventDefault();
      }
    }
  };
})
;