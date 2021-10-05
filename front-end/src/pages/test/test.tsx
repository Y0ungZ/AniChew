import React, { FormEvent, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth, useUser } from '../../hooks';
import { mainAxios } from '../../libs/axios';

const Test = () => {
  console.log('TEst');
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  const auth = useAuth();
  const user = useUser();

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mainAxios.get(`/user/test/${inputRef.current!.value}`).then((res) => {
      if (res.status === 200) {
        mainAxios.defaults.headers.common.Authorization = res.data.token;
        localStorage.setItem('token', res.data.token);
        auth.isLoggedIn = true;
        if (!res.data.newUser) {
          user.me();
          history.push('/cold-start');
        } else {
          history.push(history.location.pathname);
        }
      }
    });
  };

  return (
    <form onSubmit={login}>
      <input type="text" ref={inputRef} />
      <button type="submit">로그인</button>
    </form>
  );
};

export default Test;
