import adaptServerData from "./data/data-adapter";

const checkStatus = (response) => {
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return response;
};

const toJSON = (resp) => resp.json();

const getDataFromServer = (url) => {
  return fetch(url).then(checkStatus).then(toJSON);
};

const SERVER_URL = `https://es.dump.academy/guess-melody/`;
const APP_ID = 560773;

export default class Loader {
  static loadData() {
    return getDataFromServer(`${SERVER_URL}questions`)
        .then((data) => adaptServerData(data));
  }

  static saveResult(data) {
    const requestParams = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}stats/${APP_ID}`, requestParams)
        .then(checkStatus);

  }

  static getStatistic() {
    return getDataFromServer(`${SERVER_URL}stats/${APP_ID}`);
  }
}
