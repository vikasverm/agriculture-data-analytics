import React from 'react';
import { Table } from '@mantine/core';

interface DataRow {
  id: number;
  year: number;
  maxCrop: string;
  minCrop: string;
}

interface AggregatedTableProps {
  data: DataRow[];
}

const AggregatedTable: React.FC<AggregatedTableProps> = ({ data }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Crop with Maximum Production</th>
          <th>Crop with Minimum Production</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.year}</td>
            <td>{row.maxCrop}</td>
            <td>{row.minCrop}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AggregatedTable;
