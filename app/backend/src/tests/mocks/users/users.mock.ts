const VALID_EMAIL = 'definatelyNotSantaClaus@gmail.com';
const INVALID_EMAIL = 'example.example.com';

const VALID_PASSWORD = 'lookatthisverycoolpassword';

const USER = {
  email: VALID_EMAIL,
  password: VALID_PASSWORD
}

const USER_INVALID_EMAIL = {
  email: INVALID_EMAIL,
  password: VALID_PASSWORD
}

const USER_INVALID_PASSWORD = {
  email: VALID_EMAIL,
  password: VALID_PASSWORD
}
export default { USER, USER_INVALID_EMAIL, USER_INVALID_PASSWORD };