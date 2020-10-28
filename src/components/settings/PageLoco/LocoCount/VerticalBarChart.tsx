import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer
} from 'recharts';
import { ILocoCount } from '.';

type VerticalBarChartProps = {
    data: ILocoCount[],
}

const VerticalBarChart = ({ data }: VerticalBarChartProps) : JSX.Element => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 20, right: 50, bottom: 20, left: -50 }}>
        <XAxis type="number" hide />
        <YAxis
          tick={{ fontSize: 14, color: '#778899' }}
          dataKey="name"
          type="category"
          width={200}
          tickLine={false}
          axisLine={false}
          tickMargin={15} />
        <Bar dataKey="value" barSize={10} fill="#413ea0"><LabelList dataKey="value" position="right" /></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VerticalBarChart;
