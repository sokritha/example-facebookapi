import React, { useMemo } from "react";
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
  "This year": [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

export default function CustomLineChart({ history }) {
  const [durationLabel, setDurationLabel] = React.useState("This week");
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDurationLabel(value);
  };

  const xAxis = xAxisLabels[durationLabel];

  const totalIncome = useMemo(() => {
    // Check the value of selection form
    if (durationLabel === "This week") {
      const today = moment().format("YYYY-MM-DD");
      let initialVal = [0, 0, 0, 0, 0, 0, 0];

      history
        .filter(({ paidDate }) => moment(paidDate).isSame(today, "week"))
        .forEach((e) => {
          let nthOfDay = moment(e.paidDate, "YYYY-MM-DD").day();
          if (nthOfDay == 0) {
            console.log("Sunday");
            initialVal[0] += e.price * e.amount;
          } else if (nthOfDay == 1) {
            console.log("Monday");
            initialVal[1] += e.price * e.amount;
          } else if (nthOfDay == 2) {
            console.log("Tues");
            initialVal[2] += e.price * e.amount;
          } else if (nthOfDay == 3) {
            console.log("WEd");
            initialVal[3] += e.price * e.amount;
          } else if (nthOfDay == 4) {
            console.log("Thur");
            initialVal[4] += e.price * e.amount;
          } else if (nthOfDay == 5) {
            console.log("Fri");
            initialVal[5] += e.price * e.amount;
          } else if (nthOfDay == 6) {
            console.log("Sat");
            initialVal[6] += e.price * e.amount;
          }
        });
      return initialVal;
    } else if (durationLabel === "This month") {
      const today = moment().format("YYYY-MM-DD");
      let initialVal = [0, 0, 0, 0];

      history
        .filter(({ paidDate }) => moment(paidDate).isSame(today, "month"))
        .forEach((e) => {
          let nthOfWeek = Math.ceil(moment(e.paidDate, "YYYY-MM-DD").day()) / 7;
          if (nthOfWeek == 1) {
            console.log("Week 1");
            initialVal[0] += e.price * e.amount;
          } else if (nthOfWeek == 2) {
            console.log("Week 2");
            initialVal[1] += e.price * e.amount;
          } else if (nthOfWeek == 3) {
            console.log("Week 3");
            initialVal[2] += e.price * e.amount;
          } else if (nthOfWeek == 4) {
            console.log("Week 4");
            initialVal[3] += e.price * e.amount;
          }
        });
      return initialVal;
    } else if (durationLabel === "This year") {
      const today = moment().format("YYYY-MM-DD");
      let initialVal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      history
        .filter(({ paidDate }) => moment(paidDate).isSame(today, "year"))
        .forEach((e) => {
          let nthOfMonth = moment(e.paidDate, "YYYY-MM-DD").month();
          if (nthOfMonth == 0) {
            initialVal[0] += e.price * e.amount;
          } else if (nthOfMonth == 1) {
            initialVal[1] += e.price * e.amount;
          } else if (nthOfMonth == 2) {
            initialVal[2] += e.price * e.amount;
          } else if (nthOfMonth == 3) {
            initialVal[3] += e.price * e.amount;
          } else if (nthOfMonth == 4) {
            initialVal[4] += e.price * e.amount;
          } else if (nthOfMonth == 5) {
            initialVal[5] += e.price * e.amount;
          } else if (nthOfMonth == 6) {
            initialVal[6] += e.price * e.amount;
          } else if (nthOfMonth == 7) {
            initialVal[7] += e.price * e.amount;
          } else if (nthOfMonth == 8) {
            initialVal[8] += e.price * e.amount;
          } else if (nthOfMonth == 9) {
            initialVal[9] += e.price * e.amount;
          } else if (nthOfMonth == 10) {
            initialVal[10] += e.price * e.amount;
          } else if (nthOfMonth == 11) {
            initialVal[11] += e.price * e.amount;
          }
        });
      return initialVal;
    }
    return [];
  }, [history]);

  return (
    <React.Fragment>
      <MultipleSelect
        durationLabel={durationLabel}
        handleChange={handleChange}
      />
      <Line
        options={options}
        data={{
          labels: xAxis,
          datasets: [
            {
              label: "Total Income",
              data: totalIncome,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        }}
      />
    </React.Fragment>
  );
}
