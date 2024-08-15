let axios = require('axios');
async function sendMeme() {
  let res;

  axios.get('https://meme-api.com/gimme')
    .then(response => {
      res = response.data.preview
      res = res[res.length - 1]
      return res;
    })
    .catch(error => {
      console.log(error);
    });

}

module.exports = { sendMeme }