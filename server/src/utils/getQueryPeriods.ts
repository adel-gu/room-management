const getPeriod = (queryDate: string) => {
  const now = new Date();
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const last90Days = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  const periods = [
    { name: '7', date: last7Days },
    { name: '30', date: last30Days },
    { name: '90', date: last90Days },
  ];

  return periods.find((period) => period.name === queryDate) ?? periods[0];
};

export default getPeriod;
