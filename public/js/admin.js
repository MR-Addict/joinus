const myChart1 = document.getElementById("myChart1").getContext("2d");
const myChart2 = document.getElementById("myChart2").getContext("2d");
const myChart3 = document.getElementById("myChart3").getContext("2d");
const myChart4 = document.getElementById("myChart4").getContext("2d");

const submitChart = new Chart(myChart1, {
  type: "doughnut", // bar,horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: ["今日提交", "所有提交"],
    datasets: [
      {
        data: [15, 45],
        backgroundColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)"],
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "提交",
        position: "bottom",
        font: {
          size: 16,
        },
      },
      legend: {
        display: true,
        position: "top",
      },
    },
  },
});

const genderChart = new Chart(myChart2, {
  type: "doughnut", // bar,horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: ["男", "女"],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)"],
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "男女比",
        position: "bottom",
        font: {
          size: 16,
        },
      },
      legend: {
        display: true,
        position: "top",
      },
    },
  },
});

const groupChart1 = new Chart(myChart3, {
  type: "bar", // bar,horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: ["组策", "技术", "科普", "新宣", "外联", "双创"],
    datasets: [
      {
        data: [65, 35, 65, 35, 65, 35],
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
  options: {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "第一志愿",
        position: "bottom",
        font: {
          size: 16,
        },
      },
      legend: {
        display: false,
        position: "top",
      },
    },
  },
});

const groupChart2 = new Chart(myChart4, {
  type: "bar", // bar,horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: ["组策", "技术", "科普", "新宣", "外联", "双创"],
    datasets: [
      {
        data: [65, 35, 65, 35, 65, 35],
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
  options: {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "第二志愿",
        position: "bottom",
        font: {
          size: 16,
        },
      },
      legend: {
        display: false,
        position: "top",
      },
    },
  },
});
