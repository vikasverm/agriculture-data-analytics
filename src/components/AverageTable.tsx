import React from 'react';
import { Table } from '@mantine/core';

interface AverageData {
  crop: string;
  avgYield: number;
  avgArea: number;
}

interface AverageTableProps {
  data: AverageData[];
}

const AverageTable: React.FC<AverageTableProps> = ({ data }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Crop</th>
          <th>Average Yield (1950-2020)</th>
          <th>Average Cultivation Area (1950-2020)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.crop}</td>
            <td>{row.avgYield.toFixed(3)}</td>
            <td>{row.avgArea.toFixed(3)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AverageTable;
