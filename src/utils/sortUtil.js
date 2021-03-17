export const sortData = (data) => {
  const listedData = [...data];

  return listedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};
