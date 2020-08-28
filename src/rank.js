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

const countCaptainHistoryRiskByHistoryLength = (history, _captainHistoryRisk) => {
  if (history.length < 5) {
    _captainHistoryRisk += 4;
  }
  return _captainHistoryRisk;
}


const countCaptainHistoryRiskByHistoryProfit = (history, _captainHistoryRisk) => {

  _captainHistoryRisk += history.filter(v => v.profit < 0).length;
  return _captainHistoryRisk;
}

function captainHistoryRisk (voyage, history) {
  let _captainHistoryRisk = 1;
  _captainHistoryRisk = countCaptainHistoryRiskByHistoryLength(history, _captainHistoryRisk);
  _captainHistoryRisk = countCaptainHistoryRiskByHistoryProfit(history, _captainHistoryRisk);
  if (voyage.zone === CHINA && hasChina(history)) {
    _captainHistoryRisk -= 2;
  }
  return Math.max(_captainHistoryRisk, 0);
}

const countVoyageProfitFactorbyVoyageZone = (voyage, _voyageProfitFactor) => {
  if (voyage.zone === CHINA) {
    _voyageProfitFactor += 1;
  }
  if (voyage.zone === EAST_INDIES) {
    _voyageProfitFactor += 1;
  }
  return _voyageProfitFactor;
}

const countVoyageProfitFactorByVoyageZoneAndHistoryLengthWhenVoyageZoneIsChinaAndHasHistory = (voyage, history, _voyageProfitFactor) => {
  _voyageProfitFactor += 3;
  if (history.length > 10) {
    _voyageProfitFactor += 1;
  }
  if (voyage.length > 12) {
    _voyageProfitFactor += 1;
  }
  if (voyage.length > 18) {
    _voyageProfitFactor -= 1;
  }
  return _voyageProfitFactor;
}

function voyageProfitFactor (voyage, history) {
  let _voyageProfitFactor = 2;
  _voyageProfitFactor = countVoyageProfitFactorbyVoyageZone(voyage, _voyageProfitFactor);
  if (voyage.zone === CHINA && hasChina(history)) {
    _voyageProfitFactor = countVoyageProfitFactorByVoyageZoneAndHistoryLengthWhenVoyageZoneIsChinaAndHasHistory(voyage, history, _voyageProfitFactor);
  }
  else {
    if (history.length > 8) {
      _voyageProfitFactor += 1;
    }
    if (voyage.length > 14) {
      _voyageProfitFactor -= 1;
    }
  }
  return _voyageProfitFactor;
}

const getRating = (_voyageProfitFactor, _voyageRisk, _captainHistoryRisk) => {
  let _rating = B;
  if (_voyageProfitFactor * 3 > (_voyageRisk + _captainHistoryRisk * 2)) {
    _rating = A;
  }
  return _rating;
}

function rating (voyage, history) {
  const _voyageProfitFactor = voyageProfitFactor(voyage, history);
  const _voyageRisk = voyageRisk(voyage);
  const _captainHistoryRisk = captainHistoryRisk(voyage, history);
  let _rating = getRating(_voyageProfitFactor, _voyageRisk, _captainHistoryRisk);
  return _rating;
}

module.exports = {
    voyageRisk,
    hasChina,
    captainHistoryRisk,
    voyageProfitFactor,
    rating,
};