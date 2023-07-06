import { ResponsiveLine } from "@nivo/line";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { tokens } from "../theme";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { hostServer, getAuthHeader } from "../data/apiConfig";
import { useAuth } from "../hooks/useAuth";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();

  const [data, setData] = useState({
    loading: true,
    trends: null,
    error: null,
  });

  let fetchApplicationsTrend = () => {
    axios
      .get(
        `${hostServer}/reporting/application_trend?company_id=1&days=5`,
        getAuthHeader(user)
      )
      .then((response) => {
        console.log("consolde", response.data.response);
        setData({
          ...data,
          loading: false,
          trends: [
            {
              id: "Rejected",
              color: tokens("dark").redAccent[500],
              data: response.data.response.map((e) => {
                return {
                  x: e.date,
                  y: e.rejected,
                };
              }),
            },
            {
              id: "Hired",
              color: tokens("dark").greenAccent[500],
              data: response.data.response.map((e) => {
                return {
                  x: e.date,
                  y: e.selected,
                };
              }),
            },
            {
              id: "CV Received",
              color: tokens("dark").blueAccent[500],
              data: response.data.response.map((e) => {
                return {
                  x: e.date,
                  y: e.received,
                };
              }),
            },
          ],
        });
      })
      .catch((error) => {
        setData({
          ...data,
          loading: false,
          error: error,
        });
      });
  };

  useEffect(() => {
    fetchApplicationsTrend();
  }, []);

  return data.loading ? (
    <Box display={"flex"} justifyContent={"center"} mt="100px">
      <CircularProgress color="secondary" />
    </Box>
  ) : data.trends ? (
    <ResponsiveLine
      data={data.trends}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={{ datum: "color" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  ) : (
    <Box display={"flex"} justifyContent={"center"} mt="100px">
      <div onClick={(_) => fetchApplicationsTrend()}>Retry</div>
    </Box>
  );
};

export default LineChart;
