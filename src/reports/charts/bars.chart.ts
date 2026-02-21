import {
  chartJsToImage,
  months,
  NAMED_COLORS,
  numbers,
  transparentize,
} from 'src/helpers';

export const getBarsChart = async (): Promise<string> => {
  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

  const labels = months({ count: 7 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Fully Rounded',
        data: numbers(NUMBER_CFG),
        borderColor: NAMED_COLORS.red,
        backgroundColor: transparentize(NAMED_COLORS.red, 0.5),
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
      },
      {
        label: 'Small Radius',
        data: numbers(NUMBER_CFG),
        borderColor: NAMED_COLORS.blue,
        backgroundColor: transparentize(NAMED_COLORS.blue, 0.5),
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
  };

  const image = await chartJsToImage(config);
  return image;
};
