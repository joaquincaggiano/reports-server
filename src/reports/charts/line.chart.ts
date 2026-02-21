import {
  CHART_COLORS,
  chartJsToImage,
  numbers,
  transparentize,
} from 'src/helpers';

interface LineEntry {
  label: string;
  value: number;
}

interface LineOptions {
  entries: LineEntry[];
  dataSetLabel?: string;
}

export const getLineChart = async (options: LineOptions): Promise<string> => {
  const { entries, dataSetLabel } = options;
  const data = {
    labels: entries.map((entry) => entry.label),
    datasets: [
      {
        label: dataSetLabel ?? 'Line Chart',
        data: entries.map((entry) => entry.value),
        borderColor: CHART_COLORS[0],
        backgroundColor: transparentize(CHART_COLORS[0], 0.5),
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
  };

  const image = await chartJsToImage(config, { width: 500, height: 200 });
  return image;
};
