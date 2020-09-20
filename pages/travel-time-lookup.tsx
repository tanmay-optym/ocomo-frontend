import PageSettings from '../src/components/settings/PageSettings';
import TravelTimeLookup from '../src/components/settings/TravelTimeLookup';

const PageTravelTimeLookup = (): React.FC => {
  return <PageSettings component={<TravelTimeLookup />} />;
};

export default PageTravelTimeLookup;
