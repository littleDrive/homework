const CHINA = 'china';
const EAST_INDIES = 'east-indies';
const A ='A';
const B = 'B';

const countVoyageRiskByVoyageLength = (voyage, _voyageRisk)  => {
  if (voyage.length > 4) {
    _voyageRisk += 2;
  }
  if (voyage.length > 8) {
    _voyageRisk += voyage.length - 8;
  }
  return _voyageRisk;
}

const countVoyageRiskByVoyageZone = (voyage, _voyageRisk) => {
  if ([
    CHINA,
    EAST_INDIES,
  ].includes(voyage.zone)) {
    _voyageRisk += 4;
  }
  return _voyageRisk;
}

function voyageRisk (voyage) {
  let _voyageRisk = 1;
  _voyageRisk = countVoyageRiskByVoyageLength(voyage, _voyageRisk);
  _voyageRisk = countVoyageRiskByVoyageZone(voyage, _voyageRisk);
  return Math.max(_voyageRisk, 0);
}

function hasChina (history) {
  return history.some(v => CHINA === v.zone);
}

function captainHistoryRisk (voyage, history) {
  let _captainHistoryRisk = 1;
  if (history.length < 5) {
    _captainHistoryRisk += 4;
  }
  _captainHistoryRisk += history.filter(v => v.profit < 0).length;
  if (voyage.zone === CHINA && hasChina(history)) {
    _captainHistoryRisk -= 2;
  }
  return Math.max(_captainHistoryRisk, 0);
}

function voyageProfitFactor (voyage, history) {
  let result = 2;
  if (voyage.zone === CHINA) {
    result += 1;
  }
  if (voyage.zone === EAST_INDIES) {
    result += 1;
  }
  if (voyage.zone === CHINA && hasChina(history)) {
    result += 3;
    if (history.length > 10) {
      result += 1;
    }
    if (voyage.length > 12) {
      result += 1;
    }
    if (voyage.length > 18) {
      result -= 1;
    }
  }
  else {
    if (history.length > 8) {
      result += 1;
    }
    if (voyage.length > 14) {
      result -= 1;
    }
  }
  return result;
}

function rating (voyage, history) {
  const _voyageProfitFactor = voyageProfitFactor(voyage, history);
  const _voyageRisk = voyageRisk(voyage);
  const _captainHistoryRisk = captainHistoryRisk(voyage, history);
  if (_voyageProfitFactor * 3 > (_voyageRisk + _captainHistoryRisk * 2)) {
    return A;
  }
  else {
    return B;
  }
}

module.exports = {
    voyageRisk,
    hasChina,
    captainHistoryRisk,
    voyageProfitFactor,
    rating,
};