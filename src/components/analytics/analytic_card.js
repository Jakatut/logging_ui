// @flow
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

import { Bar, HorizontalBar, Line } from "react-chartjs-2";
import GetLogs from "../../logs";

const AnalyticsCard = (props) => {
  const [chartData, setChartData] = useState({
    title: "Test",
    type: "bar-vertical",
    labels: ["debug"],
    data: [10, 2],
    description: "test",
    relation: "quantity", // quantity|time
  });

  useEffect(() => {
    setChartData(props.chartData);
  }, [props]);

  const createChart = (title, type, labels, data, relation) => {
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    var chartData = {
      labels: labels,
      datasets: [
        {
          fill: false,
          label: title,
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // const getLogQuantitiesByDate = () => {
    //   const logs = GetLogs();
    // };

    const getLogQuantityByLogType = () => {
      var counts = {};
      labels.forEach((label) => {
        const logs = GetLogs(label).then((data) => {
          counts[label] = logs.total;
        });
      });

      return counts;
    };
    var counts = getLogQuantityByLogType();
    var chartLabels = [];
    var chartValues = [];
    for (const label in counts) {
      chartLabels.push(label);
      chartValues.push(counts[label]);
    }
    chartData.datasets.data = chartValues;
    chartData.labels = chartLabels;

    switch (type) {
      case "bar-vertical":
        return <Bar data={chartData} options={options} />;
      case "bar-horizontal":
        return <HorizontalBar data={chartData} options={options} />;
      case "line":
        return <Line data={chartData} options={options} />;
      default:
        return <Bar data={chartData} options={options} />;
    }
  };

  useEffect(() => {
    setChartData(props.chartData);
  }, [props]);

  return (
    <Card>
      <CardActionArea>
        {createChart(
          chartData.title,
          chartData.type,
          chartData.labels,
          chartData.data
        )}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {chartData.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Details
        </Button>
        <Button size="small" color="primary">
          Edit View
        </Button>
      </CardActions>
    </Card>
  );
};

export default AnalyticsCard;
