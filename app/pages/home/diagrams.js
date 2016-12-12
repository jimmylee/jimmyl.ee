import React from 'react';
const currentYear = new Date().getFullYear();

export const diagramOne = {
  title: 'Live Work',
  sizing: [`***********`, `*********`],
  data: [
    [`2016`, <a href="https://bold.co">Bold</a>, 'A web application for companies to share ideas and knowledge.'],
    ['2014 — 2016', <a href="https://patreon.com">Patreon</a>, 'A web application for creators to get recurring funding.'],
    ['2013 — 2014', <a href="https://www.neonmob.com">NeonMob</a>, 'A web application for trading digital art.']
  ]
};

export const diagramTwo = {
  title: 'In Progress',
  sizing: [`***********`, `*********`],
  data: [
    [`2015 — ${currentYear}`, 'RabbitCamp', 'A strategy RPG built on my WebGL game engine.']
  ]
};

export const diagramThree = {
  title: 'Graveyard',
  sizing: [`***********`, `*********`],
  data: [
    [`2012`, <a href="https://techcrunch.com/2012/11/05/jive-software-acquires-meetings-io-and-producteev-to-enhance-social-platform-with-real-time-messaging-and-task-management/">MeetingsIO</a>, 'A web application for video chat. The business was acquired.'],
    [`2011`, <a href="https://blogs.msdn.microsoft.com/xweb/2010/07/19/free-green-business-web-site-template/">Microsoft</a>, 'Five HTML 1.0 strict templates for Expression Web 4. The product was discontinued.']
  ]
};

export const diagramFour = {
  title: 'Contact',
  sizing: [],
  data: [
    [<a href="https://www.twitter.com/meanjim">Twitter</a>],
    [<a href="https://www.github.com/meanjim">Github</a>],
    [<a href="https://angel.co/meanjim">Angel List</a>],
    ['request [at] jimmyl.ee'],
    [`© Jimmy Lee ${currentYear}`]
  ]
};
