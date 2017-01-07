import React from 'react';
const currentYear = new Date().getFullYear();

export const diagramOne = {
  title: 'Live Work',
  sizing: [`***********`, `*********`],
  data: [
    [`2016 — ${currentYear}`, <a href="https://bold.io">IO</a>, 'Single user writing experience and publishing.'],
    [`2016 — ${currentYear}`, <a href="https://bold.co">Bold</a>, 'A private internal blog for companies with auxiliary features based on requests.'],
    ['2014 — 2016', <a href="https://patreon.com">Patreon</a>, 'Providing a method for creators to get recurring funding. Patron and creator experience work.'],
    ['2013 — 2014', <a href="https://www.neonmob.com">NeonMob</a>, 'Trading digital art and creating digital scarcity. Two sided marketplace with social game mechanics.']
  ]
};

export const diagramTwo = {
  title: 'Unfinished',
  sizing: [`***********`, `*********`],
  data: [
    [`2015 — ${currentYear}`, 'RabbitCamp', 'A strategy RPG built on my WebGL game engine.']
  ]
};

export const diagramThree = {
  title: 'Graveyard',
  sizing: [`***********`, `*********`],
  data: [
    [`2012`, <a href="https://techcrunch.com/2012/11/05/jive-software-acquires-meetings-io-and-producteev-to-enhance-social-platform-with-real-time-messaging-and-task-management/">MeetingsIO</a>, 'Video chat without the need for authentication. The business was acquired.'],
    [`2010`, <a href="https://blogs.msdn.microsoft.com/xweb/2010/07/19/free-green-business-web-site-template/">Microsoft</a>, 'Five HTML 1.0 strict templates for Expression Web 4. The product was discontinued.']
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
    [`© ${currentYear} — Jimmy Lee`]
  ]
};
