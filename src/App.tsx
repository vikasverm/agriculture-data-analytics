import React from 'react';
import { MantineProvider } from '@mantine/core';
import AggregatedTable from './components/AggregatedTable';
import AverageTable from './components/AverageTable';
import agricultureData from './path-to-dataset.json';

interface RawData {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string;
  "Area Under Cultivation (UOM:Ha(Hectares))": string;
}

const processAggregatedData = (data: RawData[]) => {
  const processedData: { [year: number]: { maxCrop: string; minCrop: string } } = {};

  data.forEach((row) => {
    const year = parseInt(row.Year.split(', ')[1]);
    const production = parseFloat(row["Crop Production (UOM:t(Tonnes))"]) || 0;

    if (!processedData[year]) {
      processedData[year] = { maxCrop: row["Crop Name"], minCrop: row["Crop Name"] };
    }

    if (production > parseFloat(processedData[year].maxCrop)) {
      processedData[year].maxCrop = row["Crop Name"];
    }

    if (production < parseFloat(processedData[year].minCrop)) {
      processedData[year].minCrop = row["Crop Name"];
    }
  });

  return Object.keys(processedData).map((year, index) => ({
    id: index,
    year: parseInt(year),
    maxCrop: processedData[parseInt(year)].maxCrop,
    minCrop: processedData[parseInt(year)].minCrop,
  }));
};

const processAverageData = (data: RawData[]) => {
  const processedData: { [crop: string]: { totalYield: number; totalArea: number; count: number } } = {};

  data.forEach((row) => {
    const crop = row["Crop Name"];
    const yieldValue = parseFloat(row["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0;
    const area = parseFloat(row["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0;

    if (!processedData[crop]) {
      processedData[crop] = { totalYield: 0, totalArea: 0, count: 0 };
    }

    processedData[crop].totalYield += yieldValue;
    processedData[crop].totalArea += area;
    processedData[crop].count += 1;
  });

  return Object.keys(processedData).map((crop) => ({
    crop,
    avgYield: processedData[crop].totalYield / processedData[crop].count,
    avgArea: processedData[crop].totalArea / processedData[crop].count,
  }));
};

const App: React.FC = () => {
  const aggregatedData = processAggregatedData(agricultureData as RawData[]);
  const averageData = processAverageData(agricultureData as RawData[]);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div>
        <h1>Agriculture Data</h1>
        <AggregatedTable data={aggregatedData} />
        <AverageTable data={averageData} />
      </div>
    </MantineProvider>
  );
};

export default App;
