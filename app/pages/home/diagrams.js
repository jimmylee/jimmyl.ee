const currentYear = new Date().getFullYear();

export const diagramOne = {
  title: 'Live Work',
  sizing: [`***********`, `**********`],
  data: [
    [`2016       `, 'Bold      ', 'A web application for companies to share ideas and knowledge.'],
    ['2014 — 2016', 'Patreon   ', 'A web application for creators to get recurring funding.'],
    ['2013 — 2014', 'Neonmob   ', 'A web application for trading digital art.']
  ]
};

export const diagramTwo = {
  title: 'In Progress',
  sizing: [`***********`, `**********`],
  data: [
    [`2015 — ${currentYear}`, 'RabbitCamp', 'A strategy RPG built on my WebGL game engine.']
  ]
};

export const diagramThree = {
  title: 'Graveyard',
  sizing: [`***********`, `**********`],
  data: [
    [`2012       `, 'MeetingsIO', 'A web application for video chat. The business was acquired.'],
    [`2011`, 'Microsoft', 'Five HTML 1.0 strict templates for Expression Web 4. The product was discontinued.']
  ]
};

export const diagramFour = {
  title: 'Contact',
  sizing: [],
  data: [
    ['@meanjim'],
    ['request@jimmyl.ee']
  ]
};
