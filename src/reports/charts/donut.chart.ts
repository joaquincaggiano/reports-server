import { chartJsToImage } from 'src/helpers';

interface DonutEntry {
  label: string;
  value: number;
}

interface DonutOptions {
  entries: DonutEntry[];
  dataSetLabel?: string;
  title?: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
}

export const getDonutChart = async (options: DonutOptions): Promise<string> => {
  const { entries, title, dataSetLabel, position = 'left' } = options;
  const data = {
    labels: entries.map((entry) => entry.label),
    datasets: [
      {
        label: dataSetLabel ?? 'Donut Chart',
        data: entries.map((entry) => entry.value),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position: position,
      },
      plugins: {
        datalabels: {
          color: 'white',
          font: {
            bold: true,
            size: 14,
          },
        },
      },
      title: {
        display: title ? true : false,
        text: title,
      },
    },
  };

  const image = await chartJsToImage(config);
  return image;
};
