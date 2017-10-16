import React from 'react';
const currentYear = new Date().getFullYear();

export const diagramOne = {
  title: 'In production',
  sizing: [`***********`, `*********`],
  data: [
    [
      `2017`,
      <a href="https://expo.io">Expo</a>,
      'Expo is a platform, development tools, and a new medium. I am currently building products for people who use and create Expo projects.',
    ],
    [
      '2014 — 2016',
      <a href="https://patreon.com">Patreon</a>,
      'Patreon is an online platform for helping creators get paid. I refactored and built a lot of the web experience and established the Front-end Engineering team.',
    ],
    [
      '2013 — 2014',
      <a href="https://www.neonmob.com">NeonMob</a>,
      'NeonMob is an online platform for trading and collecting art. I worked on the Front-end.',
    ],
  ],
};

export const diagramTwo = {
  title: 'Work in progress',
  sizing: [`***********`, `*********`],
  data: [
    [
      `2015 — ${currentYear}`,
      'Rabbit Camp',
      'Rabbit Camp is a strategy RPG built on my WebGL game engine. Built from scratch.',
    ],
  ],
};

export const diagramThree = {
  title: 'Discontinued',
  sizing: [`***********`, `*********`],
  data: [
    [
      `2016 — 2017`,
      <a href="https://bold.io">IO</a>,
      'IO is a single user writing experience with anonymous publishing. I built the Front-end. The company was acquired by Postmates.',
    ],
    [
      `2016 — 2017`,
      <a href="https://bold.co">Bold</a>,
      'Bold is a private internal blog for companies with social features. I built the Front-end with collaborators. The company was acquired by Postmates.',
    ],
    [
      `2012`,
      <a href="https://techcrunch.com/2012/11/05/jive-software-acquires-meetings-io-and-producteev-to-enhance-social-platform-with-real-time-messaging-and-task-management/">
        Meetings IO
      </a>,
      'MeetingsIO was a web based video chat using WebRTC. I built Front-end features. The company was acquired by Jive Software.',
    ],
    [
      `2010`,
      <a href="https://blogs.msdn.microsoft.com/xweb/2010/07/19/free-green-business-web-site-template/">
        Microsoft EW4
      </a>,
      'Microsoft Expression Web 4 was the next evolution of Microsoft Front Page. I made five HTML 1.0 strict templates for Expression Web 4. The product was discontinued.',
    ],
  ],
};

export const diagramFour = {
  title: 'Contact',
  sizing: [],
  data: [
    [<a href="https://www.twitter.com/meanjim">Twitter</a>],
    [<a href="https://www.github.com/jimmylee">Github</a>],
    ['jim [at] expo.io'],
    [`© ${currentYear} — Jimmy Lee`],
  ],
};
