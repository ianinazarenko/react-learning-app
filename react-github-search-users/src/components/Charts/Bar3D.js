import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Chart from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function Bar3D({ data }) {
  const chartConfigs = {
    type: 'bar2D',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Most Forked',
        theme: 'fusion',
        yAxisName: 'Forks',
        xAxisName: 'Repos',
      },
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
}

export default Bar3D;
