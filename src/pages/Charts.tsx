import { useState, ChangeEvent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { Bar } from "react-chartjs-2";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 500,
    },
  })
);

const charts = [
  "Anzahl Mitarbeiter nach Branche",
  "Languages & Competencies",
  "Individual Level vs Target Position",
];
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Mitarbeiter = () => {
  const data = {
    labels: [
      "Aerospace",
      "Automotive",
      "Management Consultancy, Auditor, Law",
      "Mechanical and Plant Engineering",
      "Gesamtergebnis",
    ],
    datasets: [
      {
        label: "Ausprägung",
        data: [5, 10, 7, 3, 25],
        backgroundColor: [
          "rgba(50, 50, 250, 0.1)",
          "rgba(50, 50, 250, 0.1)",
          "rgba(50, 50, 250, 0.1)",
          "rgba(50, 50, 250, 0.1)",
          "rgba(50, 50, 250, 0.1)",
        ],
        borderColor: [
          "rgba(100, 100, 100, 1)",
          "rgba(100, 100, 100, 1)",
          "rgba(100, 100, 100, 1)",
          "rgba(100, 100, 100, 1)",
          "rgba(100, 100, 100, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar type="" data={data} options={options} />;
};

const Languages = () => {
  const data = {
    labels: ["French", "German", "Russian", "Spanish", "Gesamtergebnis"],
    datasets: [
      {
        type: "line",
        label: "Summe",
        data: [34, 34, 45, 23, 136],
        backgroundColor: [
          "rgba(50, 250, 250, 0.1)",
          "rgba(50, 250, 250, 0.1)",
          "rgba(50, 250, 250, 0.1)",
          "rgba(50, 250, 250, 0.1)",
          "rgba(50, 250, 250, 0.1)",
        ],
        borderColor: [
          "rgba(0, 100, 100, 1)",
          "rgba(0, 100, 100, 1)",
          "rgba(0, 100, 100, 1)",
          "rgba(0, 100, 100, 1)",
          "rgba(0, 100, 100, 1)",
        ],
        borderWidth: 1,
      },
      {
        type: "bar",
        label: "Mittelwert",
        data: [14, 3, 7, 22, 46],
        backgroundColor: [
          "rgba(250, 250, 50, 0.1)",
          "rgba(250, 250, 50, 0.1)",
          "rgba(250, 250, 50, 0.1)",
          "rgba(250, 250, 50, 0.1)",
          "rgba(250, 250, 50, 0.1)",
        ],
        borderColor: [
          "rgba(100, 100, 0, 1)",
          "rgba(100, 100, 0, 1)",
          "rgba(100, 100, 0, 1)",
          "rgba(100, 100, 0, 1)",
          "rgba(100, 100, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar type="" data={data} options={options} />;
};

const Target = () => {
  const data = {
    labels: [
      "Automotive",
      "Management Consultancy, Auditor, Law",
      "Management, team management",
      "Manufacturing engineering",
      "Mechanical and Plant Engineering",
      "Aerospace EngineeringB.1.02 Skill Detail 2 - Standards",
      "Matlab Simulink",
      "Python",
      "SVN",
      "EXAM",
      "Jira",
      "Confluence",
      "Gesamtergebnis",
    ],
    datasets: [
      {
        label: "Individual Level",
        data: [3, 3, 5, 2, 2, 3, 4, 1, 2, 3, 3, 3, 37],
        backgroundColor: [
          "rgba(50, 250, 50, 0.1)",
          "rgba(50, 250, 50, 0.1)",
          "rgba(50, 250, 50, 0.1)",
          "rgba(50, 250, 50, 0.1)",
          "rgba(50, 250, 50, 0.1)",
        ],
        borderColor: [
          "rgba(0, 100, 100, 1)",
          "rgba(0, 100, 100, 1)",
          "rgba(0, 100, 100, 1)",
          "rgba(0, 100, 100, 1)",
          "rgba(0, 100, 100, 1)",
        ],
        borderWidth: 1,
      },
      {
        label: "Target Position",
        data: [4, 1, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 42],
        backgroundColor: [
          "rgba(250, 50, 50, 0.1)",
          "rgba(250, 50, 50, 0.1)",
          "rgba(250, 50, 50, 0.1)",
          "rgba(250, 50, 50, 0.1)",
          "rgba(250, 50, 50, 0.1)",
        ],
        borderColor: [
          "rgba(100, 100, 0, 1)",
          "rgba(100, 100, 0, 1)",
          "rgba(100, 100, 0, 1)",
          "rgba(100, 100, 0, 1)",
          "rgba(100, 100, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar type="" data={data} options={options} />;
};

const chartComponents = [Mitarbeiter, Languages, Target];

export const Charts = () => {
  const classes = useStyles();
  const [chart, setChart] = useState("Anzahl Mitarbeiter nach Branche");
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setChart(event.target.value as string);
    console.log(charts.indexOf(chart));
  };
  const ChartComp = chartComponents[charts.indexOf(chart)];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={10} lg={8} xl={6}>
        <Card>
          <CardHeader title="Charts" />
          <CardContent>
            <FormControl className={classes.formControl}>
              <Select
                labelId="chart-selector"
                id="chart-id"
                value={chart}
                onChange={handleChange}
              >
                {charts.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <ChartComp />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Charts;
