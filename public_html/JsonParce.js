var JData;
var PData;
var status = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}
var json = (response) => {
  return response.json()
}

document.addEventListener("DOMContentLoaded", function(event) {
  fetch('./JsonChannels.json')
    .then(status)
    .then(json)
    .then((ChannelsData) => {
      console.log('Request succeeded with JSON response', ChannelsData);
      JData = ChannelsData;
      CreateChannelsDiv();
      CreateCollection();
      BuildTimeLine();
    })
    .catch((error) => {
      console.log('Request failed', error);
    });

  fetch('./JsonWithProgramms.json')
    .then(status)
    .then(json)
    .then((ProgramData) => {
      console.log('Request succeeded with JSON response', ProgramData);
      PData = ProgramData;
      CreateProgDiv();
      CreateDescr();
      SetTime();
      BuildTimeLine();
      SetNowPosition();
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
});