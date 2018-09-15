// Initialize Firebase
var config = {
    apiKey: "AIzaSyDQvezpSemDMffstavBtACuy1uuXnPoEF4",
    authDomain: "employee-data-management-123.firebaseapp.com",
    databaseURL: "https://employee-data-management-123.firebaseio.com",
    projectId: "employee-data-management-123",
    storageBucket: "employee-data-management-123.appspot.com",
    messagingSenderId: "66795114235"
};
firebase.initializeApp(config);

let database = firebase.database();

// --------------------------------------------------------------
// At the page load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the values within the firebase node bidderData changes
// database.ref().on("value", function (snapshot) {




//     // If any errors are experienced, log them to console.
// }, function (errorObject) {
//     console.log("The read failed: " + errorObject.code);
// });


// database.ref().orderByChild('dataAdded').limitToLast(1).on('child_added', function(snapshot) {
//     let info = snapshot.val();

//     $('#last-added').html(
//         'Name: ' + info.name + 
//         '<br />Role: ' + info.role
//     )
// })

// Defining variables
var format = dateFns.format;
var randomFormat = "MM/DD/YY";

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv);

    // add data to the table
    $('#employee-table-tbody').append(
        '<tr>' +
            '<td>' + sv.name + '</td>' +
            '<td>' + sv.role + '</td>' +
            '<td>' + sv.startDate + '</td>' +
            '<td>' + sv.monthlyRate + '</td>' +
            '<td>' + sv.monthsWorked + '</td>' +
            '<td>' + sv.totalBill + '</td>' +
            // '<td>' + sv.dateAdded + '</td>' +
        '</tr>'
    )

        // Change the HTML to reflect
        // $("#name-display").text(sv.name);
        // $("#email-display").text(sv.email);
        // $("#age-display").text(sv.age);
        // $("#comment-display").text(sv.comment);

        // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// Capture Button Click
$("#emp-submit").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#emp-name").val().trim();
    role = $("#emp-role").val().trim();
    startDate = $("#emp-start-date").val().trim();
    var convertedDate = format(startDate, randomFormat);
    monthsWorked = dateFns.differenceInMonths(new Date(), new Date(convertedDate));
    monthlyRate = parseFloat($("#emp-monthly-rate").val().trim());
    // monthsWorked = parseInt($("#emp-months-worked").val().trim());
    totalBill = monthlyRate * monthsWorked;

    let obj = {
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate,
        monthsWorked: monthsWorked,
        totalBill: totalBill,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    }
    console.log(obj);

    // Code for handling the push
    database.ref().push(obj);

});