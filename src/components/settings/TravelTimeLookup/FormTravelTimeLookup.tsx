import React, { useState, useEffect } from 'react';
import FormRowContainer from '../FormRowContainer';
import FormItem from '../FormItem';
import InputHours from '../InputHours';
import InputSelectShop from '../InputSelectShop';
import TrendingFlatIcon from '../SvgIcon/TrendingFlatIcon';

type ITravelTimeLookup = {
  shop1Name: string;
  shop2Name: string;
  estimatedTravelTime: number;
};

export default function FormTravelTimeLookup(): React.FC {
  const [dataSource, setDataSource] = useState<ITravelTimeLookup[] | null>([]);

  useEffect(() => {
    const fakeData: IStandardWorkHours[] = [
      {
        shop1Name: 'Sym',
        shop2Name: 'MAC',
        estimatedTravelTime: 45
      },
      {
        shop1Name: 'Sym',
        shop2Name: 'TAS',
        estimatedTravelTime: 48
      },
      {
        shop1Name: 'KIR',
        shop2Name: 'PRG',
        estimatedTravelTime: 24
      },
      {
        shop1Name: 'KIR',
        shop2Name: 'THO',
        estimatedTravelTime: 36
      },
      {
        shop1Name: 'MEM',
        shop2Name: 'KIR',
        estimatedTravelTime: 42
      }
    ];
    setDataSource(fakeData);
  }, []);

  return (
    <div>
      {dataSource.map((data) => {
        return (
          <FormRowContainer key={data.title}>
            <FormItem label={''}>
              <InputSelectShop />
            </FormItem>
            <div style={{ marginTop: 15, marginLeft: 30 }} label={''}>
              <TrendingFlatIcon />
            </div>

            <FormItem label={''}>
              <InputSelectShop />
            </FormItem>
            <FormItem label={''}>
              <InputHours />
            </FormItem>
          </FormRowContainer>
        );
      })}
    </div>
  );
}
