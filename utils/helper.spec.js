const { expect } = require('@playwright/test');
let apiUrl;
async function getApiBaseUrl() {
    apiUrl = process.env.API_BASE_URL;
    if (!apiUrl) {
        apiUrl = 'http://thinking-tester-contact-list.herokuapp.com';
    }
    return apiUrl;
}

async function authenticateUser(userName, password, { request }) {
    const baseUrl = await getApiBaseUrl();
    const headers = {
        'Content-Type': 'application/json',
    };
    const requestBody = {
        email: userName,
        password: password,
    };

    const response = await request.post(`${baseUrl}/users/login`, {
        data: requestBody,
        headers,
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    return responseBody.token;
}

async function createEntity(userData, accessToken, module, { request }) {
    const baseUrl = await getApiBaseUrl();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };

    const response = await request.post(`${baseUrl}${module}`, {
        headers,
        data: JSON.stringify(userData),
    });

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    return responseBody?.id || null;
}

async function getEntity(accessToken, module, expectedStatus, { request }) 
{
    const baseUrl = await getApiBaseUrl();
    const headers =
    {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };

    const response = await request.get(`${baseUrl}${module}`, 
    {
        headers,
    });

    expect(response.status()).toBe(parseInt(expectedStatus));
    const responseBody = await response.json();
    return responseBody[0]?._id || null;
}

async function deleteEntity(accessToken, module, { request }) 
{
    const baseUrl = await getApiBaseUrl();
    const headers = 
    {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };

    const response = await request.delete(`${baseUrl}${module}`, 
    {
        headers,
    });

    expect(response.status()).toBe(200);
}

async function validateEntity(accessToken, module, expectedStatus, { request }) {
    const baseUrl = await getApiBaseUrl();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };

    const response = await request.get(`${baseUrl}${module}`, {
        headers,
    });

    expect(response.status()).toBe(parseInt(expectedStatus));
}

function getCurrentDateTimeStamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
}

module.exports = {
    authenticateUser,
    createEntity,
    deleteEntity,
    getEntity,
    validateEntity,
    getCurrentDateTimeStamp,
};
