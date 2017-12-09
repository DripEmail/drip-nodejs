var client = require('./index.js')({ token: "hzaqzujnogn3ghgreh1a" });

// client.testAccounts().then(function (response) {
//   console.log(response.body);
// }).catch(function (error) {
//   console.log("There was an error")
// })

client.testAccounts(function (error, response, body) {
  console.log("Success Response: ", body);

  if (error) {
    console.log("The error is: ", error)
  }
})

// client.listAccounts(function (error, response, body) {
//   console.log(response)
// })