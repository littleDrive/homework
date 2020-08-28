import 'regenerator-runtime/runtime'
const rankTest = require('ava');
const { voyageRisk, hasChina } = require('../src/rank');

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

rankTest('voyageRisk case 3. should return 4 when voyageRisk given voyage length = 9', t => {
    const voyage = {
        zone: 'west-indies',
        length: 9,
    };
    const result = voyageRisk(voyage);
    t.is(result, 4);
});

rankTest('voyageRisk case 4. should return 4 when voyageRisk given voyage length = 9 and voyage zone=china', t => {
    const voyage = {
        zone: 'china',
        length: 9,
    };
    const result = voyageRisk(voyage);
    t.is(result, 8);
});

rankTest('hasChina case 5. should return true when hasChina given history include china', t => {
    const history = [
        {
            zone: 'china',
            profit: -2,
        }
    ];
    const result = hasChina(history);
    t.is(result, true);
});

rankTest('hasChina case 6. should return true when hasChina given history no include china', t => {
    const history = [
        {
            zone: 'west-africa',
            profit: 7,
        }
    ];
    const result = hasChina(history);
    t.is(result, false);
});