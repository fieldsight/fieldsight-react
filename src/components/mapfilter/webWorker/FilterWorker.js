export default () => {
  self.addEventListener('message', e => {
    // eslint-disable-line no-restricted-globals
    if (!e) return;
    // const users = 's';
    // console.log('inside worker.js');

    const { action, state } = e.data;

    let filteredData = [];
    const clonefilteredData = [];
    let inititalProgressData = [];
    let finalProgressData = [];
    let isSelected = false;
    let isProjectSelected = false;

    Object.keys(action.payload.filterByType).forEach(type => {
      if (type === 'project') {
        if (action.payload.filterByType[type].length > 0) {
          filteredData = state.primaryGeojson[0].features.filter(
            data =>
              action.payload.filterByType[type].includes(data[type]),
          );
        } else {
          isProjectSelected = true;
          filteredData = [];
        }
      }

      if (
        action.payload.filterByType[type].length > 0 &&
        isProjectSelected === false
      ) {
        if (type === 'progress') {
          const { progress } = action.payload.filterByType;
          progress.forEach(element => {
            const splittedProgress = element.split('_');
            const progress0 = splittedProgress[0];
            const progress1 = splittedProgress[1];
            const min = parseInt(progress0, 10);
            const max = parseInt(progress1, 10);
            const progressfilter = filteredData.filter(
              data => data[type] >= min && data[type] <= max,
            );
            clonefilteredData.push(progressfilter);
          });
          if (clonefilteredData.length === 0) {
            filteredData = [];
          }
          if (clonefilteredData.length > 1) {
            clonefilteredData.forEach((data, index) => {
              if (index === 0) {
                inititalProgressData = data;
              } else {
                finalProgressData = inititalProgressData.concat(data);
                inititalProgressData = finalProgressData;
              }
            });
            filteredData = finalProgressData;
          } else {
            const a = clonefilteredData[0];
            filteredData = a;
          }
        }
        if (type === 'status') {
          filteredData = filteredData.filter(data =>
            action.payload.filterByType[type].includes(data[type]),
          );
        }
        if (type === 'site_type') {
          filteredData = filteredData.filter(data =>
            action.payload.filterByType[type].includes(data[type]),
          );
        }
        if (type === 'region') {
          filteredData = filteredData.filter(data =>
            action.payload.filterByType[type].includes(data[type]),
          );
        }
      }
      isSelected = true;
    });
    const finaloutput = { filteredData, isSelected };

    postMessage(finaloutput);
  });
};
