import React, { useState, useEffect } from 'react';
import LocoCount, { ILocoCount } from '../LocoCount';

type LocoCountModelPRops = {
  styles?: React.CSSProperties
}

const LocoCountModel = ({ styles }: LocoCountModelPRops): JSX.Element => {
  const [dataSource, setDataSource] = useState<ILocoCount[]>([]);
  const headersCSV = [
    { label: 'Name', key: 'name' },
    { label: 'Value', key: 'value' },
  ];

  useEffect(() => {
    setDataSource([
      { name: 'TEST_1', value: 175 },
      { name: 'TEST_2', value: 54 },
      { name: 'TEST_3', value: 51 },
      { name: 'TEST_4', value: 26 },
      { name: 'TEST_5', value: 4 },
      { name: 'TEST_1', value: 175 },
      { name: 'TEST_2', value: 54 },
      { name: 'TEST_3', value: 51 },
      { name: 'TEST_4', value: 26 },
      { name: 'TEST_5', value: 4 }
    ]);
  }, []);

  return (
    <LocoCount dataSource={dataSource} headersCSV={headersCSV} styles={styles} />
  );
};

export default LocoCountModel;
