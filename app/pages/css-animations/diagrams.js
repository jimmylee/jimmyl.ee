export const supportTableOne = [
  {
    name: 'Edge',
    data: 'v12+'
  },
  {
    name: 'Chrome',
    data: 'v4+'
  },
  {
    name: 'FireFox',
    data: 'v3.5+'
  },
  {
    name: 'Safari',
    data: 'v9+'
  },
  {
    name: 'iOS Safari',
    data: 'v9.2+'
  },
  {
    name: 'Opera',
    data: 'v22+'
  },
  {
    name: 'Android',
    data: 'v53+'
  }
];

export const supportTableTwo = [
  {
    name: 'Edge',
    data: 'v12+'
  },
  {
    name: 'Chrome',
    data: 'v4+'
  },
  {
    name: 'FireFox',
    data: 'v3.5+'
  },
  {
    name: 'Safari',
    data: 'v9+'
  },
  {
    name: 'iOS Safari',
    data: 'v9.2+'
  },
  {
    name: 'Opera',
    data: 'v22+'
  },
  {
    name: 'Android',
    data: 'v53+'
  }
];

export const supportTableThree = [
  {
    name: 'Edge',
    data: 'None'
  },
  {
    name: 'Chrome',
    data: 'v36+'
  },
  {
    name: 'FireFox',
    data: 'v36+'
  },
  {
    name: 'Safari',
    data: 'v9.1+'
  },
  {
    name: 'iOS Safari',
    data: 'v9.3+'
  },
  {
    name: 'Opera',
    data: 'v24+'
  },
  {
    name: 'Android',
    data: 'v53+'
  }
];

export const supportTableFour = [
  {
    name: 'Edge',
    data: 'v12+'
  },
  {
    name: 'Chrome',
    data: 'v36+'
  },
  {
    name: 'FireFox',
    data: 'v36+'
  },
  {
    name: 'Safari',
    data: 'v9.1+'
  },
  {
    name: 'iOS Safari',
    data: 'v9.3+'
  },
  {
    name: 'Opera',
    data: 'v24+'
  },
  {
    name: 'Android',
    data: 'v53+'
  }
];

export const supportTableFive = [
  {
    name: 'Edge',
    data: 'v12+'
  },
  {
    name: 'Chrome',
    data: 'v43+'
  },
  {
    name: 'FireFox',
    data: 'v16+'
  },
  {
    name: 'Safari',
    data: 'v9+'
  },
  {
    name: 'iOS Safari',
    data: 'v9.2+'
  },
  {
    name: 'Opera',
    data: 'v30+'
  },
  {
    name: 'Android',
    data: 'v53+'
  }
];

export const diagramOne = {
  topLabel: 'User triggers an animation',
  bottomLabel: 'Bitmaps for layers created',
  diagram: [
    {
      type: 'normal',
      label: 'JavaScript',
      copy: 'It all starts by handling the necessary business logic, user event callbacks, and API function calls. While the JavaScript interpreter is executing code, the main thread is locked.'
    },
    {
      type: 'normal',
      label: 'Render Tree Construction',
      copy: 'Once JavaScript scripts run, a render tree must be created or updated. By parsing the HTML to create a DOM tree, then merging the DOM tree with the CSSOM, a render tree forms with render object nodes.'
    },
    {
      type: 'normal',
      label: 'Layout/Reflow',
      copy: 'Render objects need their geometries calculated. The main thread will make a call to determine the implications of geometry changing properties such as width, height, top, etc. The operation will produce the box model, which possesses the exact position and size of each element.'
    },
    {
      type: 'normal',
      label: 'Paint/Redraw/Reasterizing',
      copy: 'The compositor thread will make a call to perform paint setup, which obtains a list of draw cells. Afterward, those cells are painted to create bitmaps. These bitmaps are accessible from memory.'
    }
  ]
};

export const diagramTwo = {
  topLabel: 'User triggers height animation',
  diagram: [
    {
      x: 0,
      type: 'left',
      copy: 'Start height animation from 1px to 3px'
    },
    {
      x: 64 + 24,
      type: 'left',
      copy: 'Update element styles to height: 2px'
    },
    {
      x: 128 + 24 + 24,
      type: 'left',
      emphasis: true,
      copy: 'Relayout'
    },
    {
      x: 192 + 24 + 24 + 24,
      type: 'left',
      emphasis: true,
      copy: 'Paint'
    },
    {
      x: 192 + 24 + 24 + 24 + 64 + 24,
      type: 'right',
      emphasis: true,
      copy: 'Load bitmap into GPU memory'
    },
    {
      x: 192 + 24 + 24 + 24 + 64 + 24 + 64 + 24,
      type: 'right',
      copy: 'Composite and draw'
    },
    {
      x: 192 + 24 + 24 + 24 + 64 + 24,
      type: 'middle-line',
      emphasis: true
    },
    {
      x: 192 + 24 + 24 + 24 + 64 + 24 + 64 + 24,
      type: 'left',
      copy: 'Update element styles to height: 3px'
    },
    {
      x: 192 + 24 + 24 + 24 + 64 + 24 + 64 + 24 + 64 + 24,
      type: 'left',
      emphasis: true,
      copy: 'Relayout'
    },
    {
      x: 616,
      type: 'left',
      emphasis: true,
      copy: 'Repaint'
    },
    {
      x: 616 + 64 + 24,
      type: 'right',
      emphasis: true,
      copy: 'Load bitmap into GPU memory'
    },
    {
      x: 616 + 64 + 24 + 64 + 24,
      type: 'right',
      copy: 'Composite and draw'
    },
    {
      x: 616 + 64 + 24,
      type: 'middle-line',
      emphasis: true
    }
  ],
  bottomLabel: 'Height animation finished'
};

export const diagramThree = {
  topLabel: 'User triggers transform animation',
  diagram: [
    {
      x: 0,
      type: 'left',
      copy: 'Start transformY animation from 0px to 3px'
    },
    {
      x: 64 + 24,
      type: 'middle-line'
    },
    {
      x: 64 + 24,
      type: 'right',
      copy: 'Composite layer with a transformY of 1px'
    },
    {
      x: 128 + 24 + 24,
      type: 'right',

      copy: 'Composite layer with a transformY of 2px'
    },
    {
      x: 192 + 24 + 24 + 24,
      type: 'right',
      copy: 'Composite layer with a transformY of 3px'
    }
  ],
  bottomLabel: 'Transform animation finished'
};

export const diagramFour = {
  topLabel: 'Element is added to Document',
  diagram: [
    {
      x: 0,
      type: 'left',
      emphasis: true,
      copy: 'Layout'
    },
    {
      x: 64 + 24,
      type: 'left',
      emphasis: true,
      copy: 'Paint'
    },
    {
      x: 128 + 24 + 24,
      emphasis: true,
      type: 'middle-line'
    },
    {
      x: 128 + 24 + 24,
      type: 'right',
      emphasis: true,
      copy: 'Load bitmap into GPU memory'
    },
    {
      x: 192 + 24 + 24 + 24,
      type: 'right',
      copy: 'Composite draw'
    }
  ],
  bottomLabel: 'Browser page finished loading'
};

export const diagramFive = {
  title: 'Sources',
  sizing: [`*********`, `*********`],
  data: [
    ['2009', 'Tali Garsiel    ', 'http://taligarsiel.com/Projects/howbrowserswork1.htm'],
    ['2010', 'Jakob Nielsen', 'https://www.nngroup.com/articles/website-response-times/'],
    ['2013', 'Shawn Singh', 'https://www.youtube.com/watch?v=Lpk1dYdo62o'],
    ['2014', 'Max Vujovic', 'http://blogs.adobe.com/webplatform/2014/03/18/css-animations-and-transitions-performance/'],
    ['2014', 'Sara Soueidan', 'https://dev.opera.com/articles/css-will-change-property/'],
    ['2014', 'Tom Wiltzius & Vangelis Kokkevis', 'https://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome'],
    ['2015', 'Artem Tabalin', 'https://www.sitepoint.com/introduction-to-hardware-acceleration-css-animations/'],
    ['2015', 'Patrick Sexton', 'https://varvy.com/performance/cssom.html'],
    ['2015', 'Paul Lewis & Das Surma', 'https://csstriggers.com/'],
    ['2015', 'Vasanth Krishnamoorthy', 'https://github.com/vasanthk/browser-rendering-optimization/blob/master/README.md'],
    ['2016', 'Alexis Deveria', 'http://caniuse.com/#feat=will-change'],
    ['2016', 'Ilya Grigorik', 'https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=en'],
    ['2016', 'Paul Lewis & Sam Thorogood', 'https://developers.google.com/web/fundamentals/design-and-ui/animations/animations-and-performance?hl=en'],
    ['2016', 'Tom Wiltzius', 'https://www.chromium.org/developers/the-rendering-critical-path']
  ]
}
