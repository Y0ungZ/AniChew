import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RouteType } from '../../routes/config';
import Router from '../../routes/router';

type ColdStartProps = {
    routes: RouteType[]
}

const ColdStart = ({ routes }: ColdStartProps) => {
  const history = useHistory();

  useEffect(() => {
    history.push('/cold-start/info-edit');
  }, [history]);

  return <Router routes={routes} />;
};

export default ColdStart;
