function required(key: string, defaultValue: any = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  kakaoAuth: required('REACT_APP_KAKAO_AUTH_URL'),
  api: required('REACT_APP_API_DOMAIN_URL'),
  img: required('REACT_APP_IMAGE_BASE_URL'),
};
