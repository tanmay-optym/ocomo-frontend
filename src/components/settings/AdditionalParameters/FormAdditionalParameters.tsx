import React, { useState, useEffect } from 'react';
import FormRowContainer from '../FormRowContainer';
import FormItem from '../FormItem';
import InputHours from '../InputHours';
import InputSelectShop from '../InputSelectShop';
import TrendingFlatIcon from '../SvgIcon/TrendingFlatIcon';
import InputSetting from '../InputSetting';
import FormLabel from '../FormLabel';

type IAdditionalParameters = {
  shop1Name: string;
  shop2Name: string;
  estimatedTravelTime: number;
};

export default function FormAdditionalParameters(): React.FC {
  const [dataSource, setDataSource] = useState<IAdditionalParameters[] | null>([]);

  useEffect(() => {
    const fakeData : IAdditionalParameters[]= [
      {
        name: 'Apprentice Adjustment Percentage',
        value: '40',
      },
      {
        name   :'Temporary Productivity Adjustment Percentage',
        value: '30',
      },
      {
        name: 'Maximum Overtime Percentage',
        value: '25'
      },
      {
        name: 'Overtime Utilization Threshold',
        shop2Name: '58',
      },
    ];
    setDataSource(fakeData);
  }, []);

  return (
    <div>
      {dataSource.map((data) => {
        return (
          <FormRowContainer key={data.name}>
            <FormLabel style={{minWidth: 350}}>{data.name}</FormLabel>
          
            <FormItem margin={120} label={''}>
              <InputSetting value={data.value}/>
            </FormItem>
          </FormRowContainer>
        );
      })}
    </div>
  );
}
