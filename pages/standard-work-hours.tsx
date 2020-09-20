import PageSettings from '../src/components/settings/PageSettings';
import StandardWorkHours from '../src/components/settings/StandardWorkHours';

const PageResourcePlan = (): React.FC => {
  return <PageSettings component={<StandardWorkHours />} />;
};

export default PageResourcePlan;
