// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../app/data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
    console.log(friends);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out the survey questionaire then this data is then sent to the server...
  // Then the server saves the data to the friendsData array)
  // ---------------------------------------------------------------------------

  // Note the code here. Our "server" will respond to requests and let users know if they have a friend or not.
  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    // Grab user information
    var user = req.body;

    // Capture scores
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    // Declare variables for the default friend score and the minimum score difference
    var friendIndex = 0;
    var minDifference = 40;

    // Run a for-loop that begins with a zero difference and compare the user and each of the friend scores
    //  Add the difference to the total difference
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
    }

    // If the total difference is less than the predetermined minDifference variable, change the friendIndex
    // Then the new totalDifference becomes to the new minDifference
    if(totalDifference < minDifference) {
      friendIndex = i;
      minDifference = totalDifference;
    }
  }
    // After matching the user with a friend, add the user to the friend array
    friends.push(user);

    // send back to browser the best friend match
    res.json(friends[friendIndex]);
  });
};
