export const combineData = (a, b) => {
  const arr = a.objects.counties.geometries;
  const importArr = b.objects.counties.geometries;
  const newObjects = arr.map((element) => {
    const newObj = { ...element };
    importArr.forEach((item) => {
      if (element.properties.COUNTYCODE === item.id) {
        newObj.id = item.id;
        newObj.properties = {
          name: item.properties.name,
          kmt: item.properties.kmt,
          ddp: item.properties.ddp,
          pfp: item.properties.pfp,
          winner: transWinner(item.properties.winner_2020),
          winnerRate: item.properties.winning_rate_2020,
          color: transColor(transWinner(item.properties.winner_2020)),
        };
      }
    });
    return newObj;
  });
  a.objects.counties.geometries = newObjects;
  return a;
};

const transWinner = (type) => {
  if (type === '民進黨') return 'ddp';
  if (type === '國民黨') return 'kmt';
  return 'pfp';
};

const transColor = (winner) => {
  if (winner === 'ddp') return 'green';
  if (winner === 'kmt') return 'blue';
  return 'orange';
};