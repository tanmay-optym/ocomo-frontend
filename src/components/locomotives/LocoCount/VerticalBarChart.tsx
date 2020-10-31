import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer
} from 'recharts';
import styles from './VerticalBarChart.module.scss';
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
          tick={{ fontSize: 11, color: '#778899' }}
          dataKey="name"
          type="category"
          width={200}
          tickLine={false}
          axisLine={false}
          tickMargin={15} />
        <Bar dataKey="value" barSize={6} fill="#8FB2F4">
          <LabelList dataKey="value" position="right" className={styles.label} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VerticalBarChart;
