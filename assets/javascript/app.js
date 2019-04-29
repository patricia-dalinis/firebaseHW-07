$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBRwD61vwENVUAeH_NHl-y29Ghjbe_UYNA",
    authDomain: "new-test-5bd5e.firebaseapp.com",
    databaseURL: "https://new-test-5bd5e.firebaseio.com",
    projectId: "new-test-5bd5e",
    storageBucket: "new-test-5bd5e.appspot.com",
    messagingSenderId: "324295534431"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Button for Train Additions
  $("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();

    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: firstTrain,
      frequency: trainFreq
    };

    database.ref().push(newTrain);

    alert("Train Added");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#freq-input").val("");
  });

  // Firebase Event
  database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;

    // Moment Execution
    var trainFreq;
    var firstTime = 0;

    var firstTimeConvert = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConvert)

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    
    var diffTime = moment().diff(moment(firstTimeConvert), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);
    
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
    
    // Add Train Data to Table
	  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFreq + 
    "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

  });

});