export const VALID_EMAIL =
  'definatelyNotSantaClaus@gmail.com';

export const INVALID_EMAIL =
  'example.example.com';

export const VALID_PASSWORD =
  'lookatthisverycoolpassword';
export const INVALID_PASSWORD = '1234';

const USER = {
  email: VALID_EMAIL,
  password: VALID_PASSWORD,
};

const USER_INVALID_EMAIL = {
  email: INVALID_EMAIL,
  password: VALID_PASSWORD,
};

const USER_INVALID_PASSWORD = {
  email: VALID_EMAIL,
  password: INVALID_PASSWORD,
};

export default {
  USER,
  USER_INVALID_EMAIL,
  USER_INVALID_PASSWORD,
  VALID_EMAIL,
  INVALID_EMAIL,
  VALID_PASSWORD,
  INVALID_PASSWORD,
};
