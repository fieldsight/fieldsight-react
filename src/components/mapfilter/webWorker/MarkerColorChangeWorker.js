export default () => {
  self.addEventListener('message', e => {
    // eslint-disable-line no-restricted-globals
    if (!e) return;
    // const users = 's';
    // console.log('inside worker.js');

    postMessage(finaloutput);
  });
};
