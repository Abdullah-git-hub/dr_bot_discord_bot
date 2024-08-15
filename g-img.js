var axios = require("axios").default;

function giveImgLink(sKey, msg) {
  var sKeyArr = sKey.split(" ");
  var fSKey = sKeyArr.join("+");

  var options = {
    method: "GET",
    url: `https://google-search3.p.rapidapi.com/api/v1/images/q=${fSKey}`,
    headers: {
      "x-rapidapi-host": "google-search3.p.rapidapi.com",
      "x-rapidapi-key": "c8d577ce83msh59bd54db8376e98p1e837ajsn398188a6a4ed",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      var data = response.data.image_results[1];
      //   console.log(data.link.href);
      //   console.log(data.image.src);
      msg.reply(`**I have found this:**
      > ${data.link.href}
      > ${data.image.src}`)
    })
    .catch(function (error) {
      console.error(error);
      msg.reply("```An error occured```")
    });
}

module.exports = { giveImgLink };