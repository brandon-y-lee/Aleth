import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";


const products = ["Product1", "Product2", "Product3", "Product4", "Product5"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const currentMonth = new Date().getMonth();

// Generate the data
const data = months.map((month, index) => {
    const monthData = { month };
    products.forEach((product) => {
        // generate random volume for each product for each month
        monthData[product] = Math.floor(Math.random() * 100);
    });
    return monthData;
}).slice(currentMonth).concat(months.slice(0, currentMonth)); // arrange the months starting from the current month


const BarChart = () => (
  <ResponsiveBar
      data={data}
      keys={products}
      indexBy="month"
      margin={{ top: 20, right: 40, bottom: 70, left: 70 }}
      padding={0.2}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'month',
          legendPosition: 'middle',
          legendOffset: 32
      }}
      axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'volume',
          legendPosition: 'middle',
          legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
      legends={[
          {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
  />
);

export default BarChart;