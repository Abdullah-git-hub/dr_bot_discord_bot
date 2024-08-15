const axios = require("axios");
const { Client, GatewayIntentBits } = require("discord.js");
const { stayLive } = require("./server");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
  if (msg.content.startsWith("dr m all")) {
    // msg.reply("@Arafat");
    msg.reply("<@!765209032319303690>");
    // console.log(msg)
  } else if (
    msg.content == "who are you dr?" ||
    msg.content == "who are you dr"
  ) {
    msg.channel.send("A strange bot -_-");
  } else if (msg.content == "ding") {
    msg.reply("dong");
  } else if (msg.content == "hi") {
    msg.reply("Hello");
  } else if (msg.content == "dr") {
    msg.reply("How can I help you??");
  } else if (msg.content.startsWith("dr weather") == true) {
    var cityName = msg.content.slice(11).trim();

    console.log(cityName);

    var link = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env["appid"]}`;

    axios
      .get(link)
      .then((response) => {
        var wReport = {
          lon: response.data.coord.lon,
          lat: response.data.coord.lat,
          weatherFeel: response.data.weather[0].description,
          temp: response.data.main.temp,
          temp_feel: response.data.main.feels_like,
          temp_min: response.data.main.temp_min,
          temp_max: response.data.main.temp_max,
          visibility: response.data.visibility,
          wind_speed: response.data.wind.speed,
          country: response.data.sys.country,
        };

        var txt = `**Country:** ${wReport.country},
  **City:** ${cityName},
  **Latitude:** ${wReport.lat}
  **Longitude:** ${wReport.lon}
  **Weather Condition:** ${wReport.weatherFeel}
  **Temperature:** ${wReport.temp}° celcius
  **Temperature feels like:** ${wReport.temp_feel}° celcius
  **Lowest temperature:** ${wReport.temp_min}° celcius
  **Highest temperature:** ${wReport.temp_max}° celcius
  **Visibility:** ${wReport.visibility} m
  **Speed of wind:** ${wReport.wind_speed}`;

        msg.reply(txt);
      })
      .catch((err) => {
        console.log(err);
        msg.reply("City not found");
      });
  } else if (msg.content == "dr help") {
    msg.reply(
      "```type--> \ndr weather [city-name]\n dr prime [a number between 0-1000000000]\n dr meme\n dr ytThumb [link] (for downloading high res thumbnail of any youtube video) \n dr qr [text that you want to convert in qr code] \n dr help \n dr timer [time in minuites in numbers]```",
    );
  } else if (msg.content.startsWith("dr prime") == true) {
    var num = msg.content.slice(9);

    try {
      num = eval(num);

      if (Number.isInteger(num) == false) {
        msg.reply("Please provide an integer");
        console.log("worked");
      } else if (num <= 1000000000) {
        checkPrime(num, msg);
      } else {
        msg.reply("Please provide a smaller number");
      }
    } catch (err) {
      console.log(err);
      msg.reply("Please provide a number");
    }
  } else if (msg.content.startsWith("dr qr") == true) {
    // msg.reply(getThumb(msg.content.slice(11)))
    let url = msg.content.slice(6);
    let encoded = encodeURIComponent(url);
    // msg.reply(encoded);
    let link = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encoded}`;
    // msg.reply('> Your QR code', {files: [link]});
    msg.reply(link);
  } else if (msg.content.startsWith("dr meme") == true) {
    axios
      .get("https://meme-api.com/gimme")
      .then((response) => {
        res = response.data.preview;
        msg.reply(res[res.length - 1]);
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (msg.content.startsWith("/t") == true) {
    var min = parseInt(msg.content.slice(3));
    if (isNaN(min) || min == null || min == undefined) {
      msg.reply(`Please enter value correctly`);
    } else {
      msg.reply(`Timer set for **${min}** minutes 🚨`);
      const intervalId = setInterval(() => {
        min -= 1;
        if (min > 0) {
          msg.reply(`Timer: **${min} minute(s)** left`);
        } else {
          msg.reply(`🚨 Time Over 🚨`);
          clearInterval(intervalId);
        }
      }, 60 * 1000);
    }
  }
});

stayLive();
client.login(process.env["TOKEN"]);
