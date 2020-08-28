import 'regenerator-runtime/runtime'
const rankTest = require('ava');
const { voyageRisk } = require('../src/rank');

const history = [
  {
    zone: 'east-indies',
    profit: 5,
  },{
    zone: 'west-indies',
    profit: 15,
  },{
    zone: 'china',
    profit: -2,
  },
  {
    zone: 'west-africa',
    profit: 7,
  },
];

rankTest('voyageRisk case 1. should return 1 when voyageRisk given voyage length = 4', t => {
    const voyage = {
        zone: 'west-indies',
        length: 4,
    };
    const result = voyageRisk(voyage);
    t.is(result, 1);
});

rankTest('voyageRisk case 2. should return 3 when voyageRisk given voyage length = 8', t => {
    const voyage = {
        zone: 'west-indies',
        length: 8,
    };
    const result = voyageRisk(voyage);
    t.is(result, 3);
});