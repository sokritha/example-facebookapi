import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import MultipleSelect from "./select";
import moment from "moment";
import History from "@content/history.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const xAxisLabels = {
  "This week": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  "This month": ["Week 1", "Week 2", "Week 3", "Week 4"],
  "This year": ["January", "February", "March", "April", "May", "June", "July"],
};

export default function CustomLineChart() {
  const [durationLabel, setDurationLabel] = React.useState("This week");
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDurationLabel(value);
  };

  const xAxis = xAxisLabels[durationLabel];

  const filterIncome = () => {
    if (durationLabel === "This week") {
      let initialValue = [0, 0, 0, 0, 0, 0, 0];
      const currentDate = moment().format("YYYY-MM-DD");
      History.map((ele) => {
        if (moment(ele.paidDate).isSame(currentDate, "week")) {
          console.log(ele);
        }
      });
    }
    return ["", "", 10, 50, 20];
  };

  const data = {
    labels: xAxis,
    datasets: [
      {
        label: "Total Income",
        data: filterIncome(),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <React.Fragment>
      <MultipleSelect
        durationLabel={durationLabel}
        handleChange={handleChange}
      />
      <Line options={options} data={data} />
    </React.Fragment>
  );
}
