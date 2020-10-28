import React, { useState, useEffect } from 'react';
import LocoCount, { ILocoCount } from '../LocoCount';

type LocoCountWorkScopeProps = {
    styles?: React.CSSProperties,
}

const LocoCountWorkScope = ({ styles } : LocoCountWorkScopeProps): JSX.Element => {
  const [dataSource, setDataSource] = useState<ILocoCount[]>([]);
  const headersCSV = [
    { label: 'Name', key: 'name' },
    { label: 'Value', key: 'value' },
  ];

  useEffect(() => {
    setDataSource([
      { name: 'TEST_1', value: 281 },
      { name: 'TEST_2', value: 82 },
      { name: 'TEST_3', value: 27 },
      { name: 'TEST_4', value: 27 },
      { name: 'TEST_5', value: 4 },
      { name: 'TEST_1', value: 281 },
      { name: 'TEST_2', value: 82 },
      { name: 'TEST_3', value: 27 },
      { name: 'TEST_4', value: 27 },
      { name: 'TEST_5', value: 4 },
      { name: 'TEST_1', value: 281 },
      { name: 'TEST_2', value: 82 },
      { name: 'TEST_3', value: 27 },
      { name: 'TEST_4', value: 27 },
      { name: 'TEST_5', value: 4 }
    ]);
  }, []);

  return (
    <LocoCount dataSource={dataSource} headersCSV={headersCSV} styles={styles} />
  );
};

export default LocoCountWorkScope;
