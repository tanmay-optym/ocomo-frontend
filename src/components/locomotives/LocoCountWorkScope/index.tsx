import React, { useState, useEffect } from 'react';
import LocoCount, { ILocoCount } from '../LocoCount';

type LocoCountWorkScopeProps = {
  styles?: React.CSSProperties;
};

const LocoCountWorkScope = ({ styles }: LocoCountWorkScopeProps): JSX.Element => {
  const [dataSource, setDataSource] = useState<ILocoCount[]>([]);
  const headersCSV = [
    { label: 'Name', key: 'name' },
    { label: 'Value', key: 'value' },
  ];

  useEffect(() => {
    setDataSource([
      { name: 'PTC', value: 281 },
      { name: 'GE-OH', value: 82 },
      { name: 'HHP EMD OH', value: 27 },
      { name: 'MHP EMD OH', value: 24 },
      { name: 'Main Gen', value: 17 },
      { name: 'Engine Damage', value: 16 },
      { name: '2019 carry over', value: 13 },
      { name: 'LHP EMD OH', value: 13 },
      { name: 'CNI', value: 8 },
      { name: 'PTC NEW', value: 7 },
      { name: 'T4t', value: 6 },
      { name: 'P2F', value: 4 },
      { name: 'CNI 2021', value: 4 },
      { name: 'Wreck/PTC', value: 4 },
      { name: 'Wreck', value: 3 },
      { name: 'GE T4T Program', value: 3 },
    ]);
  }, []);

  return (
    <LocoCount
      title="Loco count by work scope"
      dataSource={dataSource}
      headersCSV={headersCSV}
      styles={styles}
    />
  );
};

export default LocoCountWorkScope;
