import {test, expect} from '@playwright/test';
import { ContactPage } from '../page_object/contact.po.js';
import {LoginPage } from '../page_object/login.po.js';
import { request } from 'http';
import { access } from 'fs';
import { authenticateUser, deleteEntity, getEntity, validateEntity } from '../utils/helper.spec.js';
import { getEnabledCategories } from 'trace_events';
const ContacttestData = require('../Fixtures/contactFixture.json');
const logindata = require('../Fixtures/loginFixture.json');
//const (authenticateUser, createEntity, deleteEntity, getEntity, validateEntity) = require('..')

test.beforeEach(async ({page})=>
{
    const login = new LoginPage(page);
    await page.goto('/');
    await login.login(logindata.validUser.userName,logindata.validUser.password);
    await login.verifyValidLogin();
})

test.describe('Contact testscases', ()=>
{
    test('Contact Add test', async({page,request})=>
    {
        const contact = new ContactPage(page);
        await contact.addContact(ContacttestData.contact.firstName, ContacttestData.contact.lastName,ContacttestData.contact.birthdate,ContacttestData.contact.email,ContacttestData.contact.phone,ContacttestData.contact.street1,ContacttestData.contact.street2,ContacttestData.contact.city,ContacttestData.contact.stateProvince,ContacttestData.contact.postalCode,ContacttestData.contact.country);
        await contact.viewContact();
        await contact.validateContactCreated(ContacttestData.contact.firstName, ContacttestData.contact.lastName,ContacttestData.contact.birthdate,ContacttestData.contact.email,ContacttestData.contact.phone,ContacttestData.contact.street1,ContacttestData.contact.street2,ContacttestData.contact.city,ContacttestData.contact.stateProvince,ContacttestData.contact.postalCode,ContacttestData.contact.country);
        accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password);
        const id = await getEntity(accessToken, '/contacts', '200',{request});
        await deleteEntity(accessToken, '/contacts/${id}',{request});
        await validateEntity(accessToken, '/contacts/${id}','404',{request});
    })

    test('Contact Edit test', async ({page,request})=>
    {
        const Data =
        {
            "firstName": "susan",
            "lastName" : "khadka",
            "birthdate": "2003-02-04",
            "email" : "susankhadka38@gmail.com",
            "phone" : "9869373633",
            "street1" : "Maharajgunj",
            "city" : "Kathmandu",
            "stateProvince" : "Bagmati",
            "postalCode" : "44600",
            "country" : "Nepal",
        };
        const contact = new ContactPage(page);
        accessToken = await authenticateUser(testData.validUser.username, testData.validUser.password);
        await createEntity(Data, accessToken, '/contacts',{request});
        page.reload();
        await contact.viewContact(firstName,lastName);
        await contact.contactEdit(ContacttestData.firstName);
        await contact.validateContactCreated(ContacttestData.contactEdit.firstName, ContacttestData.contactEdit.lastName);
    })

    test('Contact Delete test', async ({page,request})=>
        {
            const Data =
            {
                "firstName": "susan",
                "lastName" : "khadka",
                "birthdate": "2003-02-04",
                "email" : "susankhadka38@gmail.com",
                "phone" : "9869373633",
                "street1" : "Maharajgunj",
                "city" : "Kathmandu",
                "stateProvince" : "Bagmati",
                "postalCode" : "44600",
                "country" : "Nepal"
            };
            const contact = new ContactPage(page);
            accessToken = await authenticateUser(testData.validUser.username, testData.validUser.password);
            await createEntity(Data, accessToken, '/contacts',{request});
            page.reload();
            await contact.viewContact(firstName,lastName);
            await contact.contactEdit(ContacttestData.firstName);
            await contact.validateContactCreated(ContacttestData.contactEdit.firstName, ContacttestData.contactEdit.lastName);
            const id = await getEntity(accessToken,'/contacts', '200', {request});
            await deleteEntity(accessToken, '/contacts/${id}', {request});
            await validateEntity(accessToken, '/contacts/${id}', '404', {request});
        })
})

