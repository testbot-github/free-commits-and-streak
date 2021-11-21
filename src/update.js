const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");

let stars = 0,
  page = 1;

const CountStars = async () => {
  let StarsData = await fetch(
    `https://api.github.com/users/testbot-github/starred?per_page=100&page=${page}`
  ).then((res) => res.json());
  stars += StarsData.length;
  page++;
  if (StarsData.length === 100) CountStars();
  else WriteReadMe();
};

const WriteReadMe = async () => {
  //Get ReadMe path
  const ReadMe = path.join(__dirname, "..", "README.md");
  const date = new Date();

  //Fetching Info From Github API
  let UserData = await fetch("https://api.github.com/users/testbot-github").then(
    (res) => res.json()
  );

  //Creating the text what we gonna save on ReadMe file
  const text = `<!-- You found this secret 👏 -->
<!--
    My secret things lol
    
    - I code more hours 
    - I am a gamer too 
    - I play minecraft, roblox, AMOUNG SUS ;--; :KEK:
    - I am also a YouTuber XD, make sure to sub ;-;
-->
    
<h1 align="center">Who am I?</h1>
<p align="center">Hello I'm Mathiscool. I use javascript to code and there is nothing so special about me...</p>

## Hello, Im Mathiscool <img src="https://raw.githubusercontent.com/testbot-github/testbot-github/master/images/WaveIcon.gif" width="30px">
# Discord - 
![Discord](https://discord.c99.nl/widget/theme-3/820142398935793685.png)
\`\`\`js
const Mathiscool = {
    Age: ??,
    Description: "${UserData.bio}",
    FavouriteLanguage: "Javascript/Python/html",
    OpenedIssues: {{ ISSUES }},
    OpenedPullRequests: {{ PULL_REQUESTS }},
    TotalCommits: {{ COMMITS }},
    Repositories: {
       Created: {{ REPOSITORIES }},
       Contributed: {{ REPOSITORIES_CONTRIBUTED_TO }}
    },
    CreatedAt: "${new Date(UserData.created_at).toString()}",
    Stars: ${stars},
    FavouriteThings: ["GitHub <3", "Discord", "VS Code", "A Potato Laptop", "Coding..."]
}; //I'm a Epic Object. UwU
\`\`\`
<hr>

## Stats
<hr>
<div align="center"><img src="https://github-profile-trophy.vercel.app/?username=testbot-github&theme=dracula"></div>

![Profile Views](https://komarev.com/ghpvc/?username=testbot-github&color=blueviolet)&nbsp;&nbsp;![Profile Followers](https://img.shields.io/badge/Followers-${
    UserData.followers
  }-blueviolet)&nbsp;&nbsp;![Profile Following](https://img.shields.io/badge/Following-${
    UserData.following
  }-blueviolet)&nbsp;&nbsp;![Profile Stars](https://img.shields.io/badge/Stars-${stars}-blueviolet)

Some of my epic coding stats here that i was doing this week 
<!--START_SECTION:waka-->
<!--END_SECTION:waka-->

<details>
    <summary><b>GitHub</b> Activity</summary>
    <img align="left" src="https://github-readme-stats.vercel.app/api?username=testbot-github&theme=tokyonight"><img align="right" src="https://github-readme-stats.vercel.app/api/top-langs/?username=testbot-github&theme=tokyonight&hide=batchfile">
    <img src="https://github-readme-streak-stats.herokuapp.com/?user=testbot-github&theme=tokyonight">
</details>
<!-- Last updated on ${date.toString()} ;-;-->
<i>Last updated on ${date.getDate()}${
    date.getDate() === 1
      ? "st"
      : date.getDate() === 2
      ? "nd"
      : date.getDate() === 3
      ? "rd"
      : "th"
  } ${
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][date.getMonth()]
  } ${date.getFullYear()} using magic</i> ✨`;

  //Saving on readme.md
  fs.writeFileSync(ReadMe, text);
};

(() => {
    CountStars();
})()
