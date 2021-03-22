import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Chart from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function Column3D({ data }) {
  const chartConfigs = {
    type: 'column3D',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Most Popular',
        theme: 'candy',
        yAxisName: 'Stars',
        xAxisName: 'Repos',
      },
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
}

export default Column3D;
