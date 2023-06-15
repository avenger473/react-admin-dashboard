import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import { hostServer } from "../data/apiConfig";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState({
    loading: true,
    candidates: null,
    error: null,
  });

  let fetchCandidatesQuality = () => {
    axios
      .post(`${hostServer}/reporting/candidate_quality`, {
        start_ts: 0,
        end_ts: Date.now(),
        company_id: 1, //TODO get company id
      })
      .then((response) => {
        setData({
          ...data,
          loading: false,
          candidates: [
            {
              id: "average",
              label: "Average",
              value: response.data.average_candidates,
              color: tokens("dark").redAccent[500],
            },
            {
              id: "poor",
              label: "Poor",
              value: response.data.poor_candidates,
              color: tokens("dark").redAccent[500],
            },
            {
              id: "good",
              label: "Good",
              value: response.data.good_candidates,
              color: tokens("dark").redAccent[500],
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
    fetchCandidatesQuality();
  }, []);

  return data.loading ? (
    <Box display={"flex"} justifyContent={"center"} mt="100px">
      <CircularProgress color="secondary" />
    </Box>
  ) : data.candidates ? (
    <ResponsivePie
      data={data.candidates}
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
      }}
      colors={{ scheme: "nivo" }}
      margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      isInteractive={false}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={true}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
    />
  ) : (
    <Box display={"flex"} justifyContent={"center"} mt="100px">
      <div onClick={(_) => fetchCandidatesQuality()}>Retry</div>
    </Box>
  );
};

export default PieChart;
