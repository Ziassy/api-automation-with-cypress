// Data driven testing
const LOGIN_USER = {
  "email": "pauziah@gmail.com",
  "password": "test123!"
}

const CREATE_USER = {
  "name": "pau-qa",
  "email": "user@example.com",
  "password": "jiasda2321@"
}

const CREATE_USER_WITH_EMPTY_NAME_PAYLOAD = {
  "name": "",
  "email": "user@example.com",
  "password": "jiasda2321@"
}

const ADD_CATEGORY = {
  "name": "Baju Muslimah",
  "description": "Ini adalah baju muslimah"
}



module.exports = {
  CREATE_USER,
  CREATE_USER_WITH_EMPTY_NAME_PAYLOAD,
  LOGIN_USER,
  ADD_CATEGORY
};