const VALID_EMAIL =
  'definatelyNotSantaClaus@gmail.com';

const INVALID_EMAIL =
  'example.example.com';

const VALID_PASSWORD =
  'lookatthisverycoolpassword';

const INVALID_PASSWORD = '1234';

const HASHED_PASSWORD = '$2a$10$yrM1cieWQfsbJ4fZuN2EceZAbeS9Lfys9x72yn7tuycE.1.A1mbte';

const USER = {
  id: 1,
  email: VALID_EMAIL,
  password: VALID_PASSWORD,
  username: 'coolusername',
  role: 'user'
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
  HASHED_PASSWORD
};
