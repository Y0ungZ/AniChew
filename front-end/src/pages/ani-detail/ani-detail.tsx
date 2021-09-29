import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mainAxios } from '../../libs/axios';

const AniDetail = () => {
  const param = useParams<{id: string}>();

  useEffect(() => {
    mainAxios.get(`${process.env.REACT_APP_API_DOMAIN_URL}/anime/${param.id}`).then(console.log);
  }, [param.id]);

  return (
    <section />
  );
};

export default AniDetail;
