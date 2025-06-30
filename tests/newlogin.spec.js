import {test, expect} from '@playwright/test';
import { LoginPage } from '../page_object/login.po.js';
const testData = require('../Fixtures/loginFixture.json');
import { beforeEach } from 'node:test';
import { verify } from 'crypto';

test.beforeEach(async ({page})=>{
    await page.goto('/');
})

test.describe('Valid login tests', () =>
{
    test('Login using valid username and password', async({page})=>
    {
        const login = new LoginPage(page);
        await login.login("testData.validUser.username", "testData.validUser.password");
        //await login.verifyValidLogin();
    });
});

test.describe('Invalid login tests',() =>{
    test('Login using invalid username and password', async ({page})=>
        {
            const login = new LoginPage(page);
            await login.login(testData.invalidUser.userName, testData.validUser.password);
            //await login.login("dulal@gmail.com", "hello123");
            await login.verifyInvalidLogin();
        });


    test('Login using valid username and  invalid password', async ({page}) =>
    {
        const login = new LoginPage(page);
        await login.login(testData.invalidUser.userName, testData.validUser.password);
        //await login.login("abijitdulal74@gmail.com", "hello123");
        await login.verifyInvalidLogin();
    });

});
