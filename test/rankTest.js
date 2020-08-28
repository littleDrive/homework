import 'regenerator-runtime/runtime'
const rankTest = require('ava');
const { voyageRisk, hasChina, captainHistoryRisk, voyageProfitFactor } = require('../src/rank');

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

rankTest('captainHistoryRisk case 7. should return 5 when captainHistoryRisk given history length=4 and history no include china', t => {
    const voyage = {
        zone: 'west-indies',
        length: 9,
    };
    const history = [
        {
            zone: 'north-africa',
            profit: 7,
        },
        {
            zone: 'east-indies',
            profit: 5,
        }, {
            zone: 'west-indies',
            profit: 15,
        }, {
            zone: 'china',
            profit: 2,
        }
    ];
    const result = captainHistoryRisk(voyage, history);
    t.is(result, 5);
});

rankTest('captainHistoryRisk case 8. should return 1 when captainHistoryRisk given history length=5 and history no include china', t => {
    const voyage = {
        zone: 'west-indies',
        length: 9,
    };
    const history = [
        {
            zone: 'north-africa',
            profit: 7,
        },
        {
            zone: 'east-indies',
            profit: 5,
        }, {
            zone: 'west-indies',
            profit: 15,
        }, {
            zone: 'china',
            profit: 1,
        },
        {
            zone: 'west-africa',
            profit: 7,
        }
    ];
    const result = captainHistoryRisk(voyage, history);
    t.is(result, 1);
});

rankTest('captainHistoryRisk case 9. should return 2 when captainHistoryRisk given history length=5 and profit<0 and history no include china', t => {
    const voyage = {
        zone: 'west-indies',
        length: 9,
    };
    const history = [
        {
            zone: 'north-africa',
            profit: 7,
        },
        {
            zone: 'east-indies',
            profit: 5,
        }, {
            zone: 'west-indies',
            profit: 15,
        }, {
            zone: 'china',
            profit: -1,
        },
        {
            zone: 'west-africa',
            profit: 7,
        }
    ];
    const result = captainHistoryRisk(voyage, history);
    t.is(result, 2);
});

rankTest('captainHistoryRisk case 10. should return 0 when captainHistoryRisk given history length=5 and profit<0 and history  include china', t => {
    const voyage = {
        zone: 'china',
        length: 9,
    };
    const history = [
        {
            zone: 'north-africa',
            profit: 7,
        },
        {
            zone: 'east-indies',
            profit: 5,
        }, {
            zone: 'west-indies',
            profit: 15,
        }, {
            zone: 'china',
            profit: -1,
        },
        {
            zone: 'west-africa',
            profit: 7,
        }
    ];
    const result = captainHistoryRisk(voyage, history);
    t.is(result, 0);
});

rankTest('voyageProfitFactor case 11. should return 3 when captainHistoryRisk given history length=8  and voyage  include china or east-indies', t => {
    const voyage = {
        zone: 'china',
        length: 9,
    };
    const history = [
        {
            zone: 'north-africa',
            profit: 7,
        },
        {
            zone: 'east-indies',
            profit: 5,
        },
        {
            zone: 'west-indies',
            profit: 15,
        }, {
            zone: 'west-indies',
            profit: -1,
        },
        {
            zone: 'west-africa',
            profit: 7,
        },
        {
            zone: 'west-indies',
            profit: 15,
        }, {
            zone: 'west-indies',
            profit: -1,
        },
        {
            zone: 'west-africa',
            profit: 7,
        }
    ];
    const result = voyageProfitFactor(voyage, history);
    t.is(result, 3);
});

rankTest('voyageProfitFactor case 12. should return 6 when captainHistoryRisk given history length=10 and include china  and voyage  include china or east-indies', t => {
  const voyage = {
    zone: 'china',
    length: 9,
  };
  const history = [
    {
      zone: 'north-africa',
      profit: 7,
    },
    {
      zone: 'china',
      profit: 5,
    },
    {
      zone: 'west-indies',
      profit: 15,
    }, {
      zone: 'west-indies',
      profit: -1,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    }, {
      zone: 'west-indies',
      profit: -1,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: -1,
    },
    {
      zone: 'west-africa',
      profit: 7,
    }
  ];
  const result = voyageProfitFactor(voyage, history);
  t.is(result, 6);
});

rankTest('voyageProfitFactor case 13. should return 7 when captainHistoryRisk given history length=12 and include china  and voyage  include china or east-indies', t => {
  const voyage = {
    zone: 'china',
    length: 9,
  };
  const history = [
    {
      zone: 'north-africa',
      profit: 7,
    },
    {
      zone: 'china',
      profit: 5,
    },
    {
      zone: 'west-indies',
      profit: 15,
    }, {
      zone: 'west-indies',
      profit: -1,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    }, {
      zone: 'west-indies',
      profit: -1,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: -1,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: -1,
    },
    {
      zone: 'west-africa',
      profit: 7,
    }
  ];
  const result = voyageProfitFactor(voyage, history);
  t.is(result, 7);
});

rankTest('voyageProfitFactor case 14. should return 8 when captainHistoryRisk given history length=18 and include china  and voyage  include china or east-indies', t => {
  const voyage = {
    zone: 'china',
    length: 18,
  };
  const history = [
    {
      zone: 'north-africa',
      profit: 7,
    },
    {
      zone: 'china',
      profit: 5,
    },
    {
      zone: 'west-indies',
      profit: 15,
    }, {
      zone: 'china',
      profit: -1,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    }, {
      zone: 'west-indies',
      profit: -1,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: -1,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: -1,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: -1,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: -1,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: -1,
    },
    {
      zone: 'west-africa',
      profit: 7,
    }
  ];
  const result = voyageProfitFactor(voyage, history);
  t.is(result, 8);
});

rankTest('voyageProfitFactor case 15. should return 15 when captainHistoryRisk given history length=9 and include china  and voyage length=15 ', t => {
  const voyage = {
    zone: 'china',
    length: 15,
  };
  const history = [
    {
      zone: 'north-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 5,
    },
    {
      zone: 'west-indies',
      profit: 15,
    }, {
      zone: 'west-indies',
      profit: -1,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    }, {
      zone: 'west-indies',
      profit: -1,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },{
      zone: 'west-indies',
      profit: -1,
    }
  ];
  const result = voyageProfitFactor(voyage, history);
  t.is(result, 3);
});
