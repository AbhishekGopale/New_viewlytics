const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      data: [50, 55, 35, 80, 99, 43, 55, 62, 55, 42, 52, 100],
      color: (opacity = 2) => `gray`,
      strokeWidth: 1,
    },
    {
      data: [25, 33, 29, 61, 88, 22, 33, 44, 33, 33, 42, 33],
      color: (opacity = 2) => `red`,
      strokeWidth: 1,
    },
  ],
  legend: ["Target", "Achieved"],
};
export default data;
