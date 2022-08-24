const myChart1 = document.getElementById("myChart1").getContext("2d");
const myChart2 = document.getElementById("myChart2").getContext("2d");
const myChart3 = document.getElementById("myChart3").getContext("2d");
const myChart4 = document.getElementById("myChart4").getContext("2d");

const statistics_data = document
  .getElementById("sta")
  .innerText.split(" ")
  .filter((item) => item !== "")
  .map((str) => {
    return Number(str);
  });

doughnut_options.plugins.title.text = "提交";
Chart.register(ChartDataLabels);
const submitChart = new Chart(myChart1, {
  type: "doughnut", // bar,horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: ["今日提交", "所有提交"],
    datasets: [
      {
        data: statistics_data.slice(0, 2),
        backgroundColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)"],
      },
    ],
  },
  options: doughnut_options,
});

doughnut_options.plugins.title.text = "男女比";
const genderChart = new Chart(myChart2, {
  type: "doughnut", // bar,horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: ["男", "女"],
    datasets: [
      {
        data: statistics_data.slice(2, 4),
        backgroundColor: ["rgba(54, 162, 235)", "rgba(255, 99, 132)"],
      },
    ],
  },
  options: doughnut_options,
});

bar_options.plugins.title.text = "第一志愿";
const groupChart1 = new Chart(myChart3, {
  type: "bar", // bar,horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: ["组策", "技术", "科普", "新宣", "外联", "双创"],
    datasets: [
      {
        data: statistics_data.slice(4, 10),
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
      },
    ],
  },
  options: bar_options,
});

bar_options.plugins.title.text = "第二志愿";
const groupChart2 = new Chart(myChart4, {
  type: "bar", // bar,horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: ["组策", "技术", "科普", "新宣", "外联", "双创"],
    datasets: [
      {
        data: statistics_data.slice(10, 16),
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
      },
    ],
  },
  plugins: [ChartDataLabels],
  options: bar_options,
});
