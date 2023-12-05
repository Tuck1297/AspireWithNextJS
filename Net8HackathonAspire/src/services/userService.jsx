import { fetchWrapper } from "../helpers/fetch-wrapper";

export const userService = {
  login,
  logout,
  getUserInfo,
  register,
  update,
  refresh,
  getAllUserInfo,
  delete: _delete,
};


async function login(baseUrl, email, password) {
  return await fetchWrapper.post(`${baseUrl}/auth/login`, {
    email: email,
    passwordhash: password,
  });
}

async function logout(baseUrl) {
  localStorage.clear();
  return await fetchWrapper.get(`${baseUrl}/auth/logout`);
}

async function refresh(baseUrl) {
    return await fetchWrapper.post(`${baseUrl}/auth/refresh-token`);
}

async function getUserInfo(baseUrl) {
  return await fetchWrapper.get(`${baseUrl}/user/getbyid`);
}

async function getAllUserInfo(baseUrl) {
  return await fetchWrapper.get(`${baseUrl}/user/getall`);
}

async function register(
  baseUrl, 
  email,
  firstname,
  lastname,
  passwordhash,
  confirmedpasswordhash
) {
  return await fetchWrapper.post(`${baseUrl}/auth/register`, {
    email,
    firstname,
    lastname,
    passwordhash,
    confirmedpasswordhash,
  });
}

async function update(
  baseUrl,
  email,
  firstname,
  lastname,
  passwordhash = null,
  confirmedpasswordhash = null
) {
  if (passwordhash === null) {
    return fetchWrapper.put(`${baseUrl}/user/update`, { email, firstname, lastname });
  } else {
    return fetchWrapper.put(`${baseUrl}/user/update`, {
      email,
      firstname,
      lastname,
      passwordhash,
      confirmedpasswordhash,
    });
  }
}

async function _delete(baseUrl, email) {
  return fetchWrapper.delete(`${baseUrl}/user/delete/${email}`);
}

async function roleUpdate(baseUrl, email, role) {
  return fetchWrapper.put(`${baseUrl}/user/roleupdate`, { email, role });
}

async function getAllUsers(baseUrl) {
  return fetchWrapper.get(`${baseUrl}/auth/getall`);
}