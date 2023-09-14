import axios from 'axios';

interface LoginDto {
  email: string;
  password: string;
}

interface RegisterPage extends LoginDto {
  username: string;
}

export function login(user: LoginDto) {
  return axios.post('http://localhost:3000/api/v1/users/login', {
    ...user,
  });
}

export function register(user: RegisterPage) {
  console.log('#register', user);
  return axios.post('http://localhost:3000/api/v1/users/register', {
    ...user,
  });
}

export function logout() {}
