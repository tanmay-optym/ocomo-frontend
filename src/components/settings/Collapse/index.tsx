import React, { useState } from 'react';
import Card from '../Card';
import CardHeader from '../CardHeader';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CardBody from '../CardBody';
import styles from './Collapse.module.scss';

type CollapseProps = {
  titlt: string;
  content: JSX.Element;
  Collapse: boolean;
};
export default function Collapse({ title, content, defaultCollapse = false }): React.FC {
  const [isCollapse, setIsCollapse] = useState(defaultCollapse);

  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  };
  const iconAction = isCollapse ? (
    <ExpandLessIcon color={'primary'} />
  ) : (
    <ExpandMoreIcon color={'primary'} />
  );

  console.log(styles);
  return (
    <div className={styles['collapse']}>
      <Card>
        <button className={styles['collapse-header']} onClick={toggleCollapse}>
          <CardHeader leftAction={iconAction} title={title}></CardHeader>
        </button>
        <div
          className={`${styles['collapse-content']} ${
            isCollapse ? styles['collapsed'] : styles['expanded']
          }`}>
          <CardBody>{content}</CardBody>
        </div>
      </Card>
    </div>
  );
}
