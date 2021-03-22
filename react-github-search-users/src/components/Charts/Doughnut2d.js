import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Chart from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function Doughnut2D({ data }) {
  const chartConfigs = {
    type: 'doughnut2D',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Stars per Repo',
        theme: 'candy',
        pieRadius: '50%',
        showPercentValues: 0,
      },
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
}

export default Doughnut2D;
