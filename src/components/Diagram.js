import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function Diagram({ inputCases, ...props }) {
  const [data, setData] = useState({});


  const diagramFunction = (data) => {
    const diagramData = [];
    let lastPoint;

    for (let date in data.cases) {
      if (lastPoint) {
        const currentPoint = {
          x: date,
          y: data[inputCases][date] - lastPoint,
        };
        diagramData.push(currentPoint);
      }
      lastPoint = data[inputCases][date];
    }
    return diagramData;
  };

  useEffect(() => {
    const graphData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=90")
        .then((response) => response.json())
        .then((data) => {
          setData(diagramFunction(data));
        });
    };
    graphData();
  }, [inputCases]);

  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(207, 0, 15, 0.3)",
                borderColor: "rgba(240, 52, 52, 1)",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default Diagram;
