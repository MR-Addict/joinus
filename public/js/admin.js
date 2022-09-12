const myChart1 = document.getElementById("myChart1").getContext("2d");
const myChart2 = document.getElementById("myChart2").getContext("2d");
const myChart3 = document.getElementById("myChart3").getContext("2d");
const myChart4 = document.getElementById("myChart4").getContext("2d");
const myChart5 = document.getElementById("myChart5").getContext("2d");
const myChart6 = document.getElementById("myChart6").getContext("2d");

const xmlHttp = new XMLHttpRequest();
xmlHttp.open("POST", "/insight", false);
xmlHttp.send(null);
const insight = JSON.parse(xmlHttp.response);
const statistics_data = Object.keys(insight.single).map(function (key) {
  return insight.single[key];
});

function getInsightDaysValues() {
  const array = [];

  getInsightDaysKeys().forEach((prop) => {
    array.push(0);
    insight.days.forEach((day) => {
      if (new Date(day.日期.slice(5)).getTime() === new Date(prop).getTime()) {
        array.pop();
        array.push(Number(day.提交次数));
      }
    });
  });
  return array;
}

function getInsightDaysKeys() {
  const array = [];
  const days_length = 7;
  for (
    dt = new Date(new Date().setDate(new Date().getDate() - days_length + 1));
    dt <= new Date();
    dt.setDate(dt.getDate() + 1)
  ) {
    const temp_date = dt.toISOString().slice(5, 10);
    array.push(Number(temp_date.split("-")[0]) + "-" + Number(temp_date.split("-")[1]));
  }
  return array;
}

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
    labels: ["女", "男"],
    datasets: [
      {
        data: statistics_data.slice(2, 4),
        backgroundColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)"],
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

bar_options.plugins.title.text = "所有志愿";
const groupChart3 = new Chart(myChart5, {
  type: "bar", // bar,horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: ["组策", "技术", "科普", "新宣", "外联", "双创"],
    datasets: [
      {
        data: statistics_data.slice(16, 22),
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

line_options.plugins.title.text = "提交曲线";
const daySubmit = new Chart(myChart6, {
  type: "line", // bar,horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: getInsightDaysKeys(),
    datasets: [
      {
        data: getInsightDaysValues(),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0,
      },
    ],
  },
  options: line_options,
});
