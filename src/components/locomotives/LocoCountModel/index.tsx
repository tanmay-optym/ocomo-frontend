import React, { useState, useEffect } from 'react';
import LocoCount, { ILocoCount } from '../LocoCount';

type LocoCountModelPRops = {
  styles?: React.CSSProperties;
};

const LocoCountModel = ({ styles }: LocoCountModelPRops): JSX.Element => {
  const [dataSource, setDataSource] = useState<ILocoCount[]>([]);
  const headersCSV = [
    { label: 'Name', key: 'name' },
    { label: 'Value', key: 'value' },
  ];

  useEffect(() => {
    setDataSource([
      { name: 'Sd70M-2', value: 175 },
      { name: 'GP38-2', value: 54 },
      { name: 'EVO-AC', value: 51 },
      { name: 'EVO-AC', value: 47 },
      { name: 'GP40-2', value: 26 },
      { name: 'Dash-9', value: 18 },
      { name: 'Sd40-3', value: 17 },
      { name: 'SD70', value: 13 },
      { name: 'C40-8', value: 12 },
      { name: 'C44-9W', value: 11 },
      { name: 'C40-8W', value: 9 },
      { name: 'ET44AC', value: 7 },
      { name: 'ES44AC', value: 6 },
      { name: 'SD38-3', value: 6 },
      { name: 'EVO-DC', value: 7 },
      { name: 'HHP', value: 6 },
      { name: 'ES44DC', value: 4 },
      { name: 'SD38-2', value: 5 },
      { name: 'SD-75', value: 4 },
    ]);
  }, []);

  return (
    <LocoCount
      title="Loco count by model"
      dataSource={dataSource}
      headersCSV={headersCSV}
      styles={styles}
    />
  );
};

export default LocoCountModel;
