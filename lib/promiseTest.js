API_TOKEN = "715a2331207748208826e8d45ad9c2a9";

var client = require('./index.js')({ token: API_TOKEN });

// client.testAccounts().then(function (response) {
//   console.log(response.body);
// }).catch(function (error) {
//   console.log("There was an error")
// })

// client.listAccounts().then(function (response) {
//   console.log(response.body);
// }).catch(function (error) {
//   console.log("There was an error")
// })

client.fetchAccount(81236113).then(function (response) {
  console.log(response.body.accounts);
}).catch(function (error) {
  console.log("There was an error", error)
})

// client.testAccounts(function (error, response, body) {
//   console.log("Success Response: ", response);

//   if (error) {
//     console.log("The error is: ", error)
//   }
// })

// client.listAccounts(function (error, response, body) {
//   console.log(response)
// })

// Backup

// module.exports = {
//   anotherTestAccounts: function (callback) {
//     var options = {
//       uri: "https://api.getdrip.com/v2/accounts",
//       headers: {
//         "content-type": this.headers["content-type"],
//         "authorization": this.headers["authorization"],
//         "User-Agent": this.headers["User-Agent"]
//       },
//       resolveWithFullResponse: true
//     }

//     if (callback) {
//       requestPromise(options).then(function (response) {
//         var body = response.body;
//         callback(null, response, body);
//       }).catch(function (error) {
//         callback(error, null, null);
//       })
//     } else {
//       return requestPromise(options);
//     }
//   }
// }