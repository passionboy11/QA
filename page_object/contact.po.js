const {expect} = require("@playwright/test");

exports.ContactPage = class Page
{
    constructor(page)
    {
        this.page = page;
        this.usernameInput = '#email';
        this.passwordInput = '//input[@placeholder = "Password"]';

        this.FirstNameInput = '//input[@id ="firstName"]';
        this.LastNameInput = '//input[@id="lastName"]';
        this.DOBInput = '//input[@id="birthdate"]';
        this.EmailInput = '//input[@id="email"]';
        this.PhoneInput = '//input[@id="phone"]';
        this.Street1Input = '//input[@id="street1"]';
        this.Street2Input = '//input[@id="street2"]';
        this.CityInput = '//input[@id="city"]';
        this.StateInput = '//input[@id="stateProvince"]';
        this.PostalInput = '//input[@id="postalCode"]';
        this.CountryInput = '//input[@id="country"]';

        this.addcontact = '//button[@id="add-contact"]';
        this.SubmitButton = '//button[@id="submit"]';
        this.CancelButton = '//button[@id="cancel"]';

        this.alertMessage = '//span[@id = "error"]'; 

        

      
        this.afterText ="//p[text('Click on any contact to view the Contact Details']";
        this.tableClick ="//td[text()=`${fname}`]";
        this.errormsg = "//span[@id='error']";

        //this.editbutton = "//button[@id='edit-contact']";


        this.savedFirstName = '//span[@id="saved-firstName"]';
        this.savedLastName = '//span[@id="saved-lastName"]';
        this.savedDOB = '//span[@id="saved-birthdate"]';
        this.savedEmail = '//span[@id="saved-email"]';
        this.savedPhone = '//span[@id="saved-phone"]';
        this.savedStreet1 = '//span[@id="saved-street1"]';
        this.savedStreet2 = '//span[@id="saved-street2"]';
        this.savedCity = '//span[@id="saved-city"]';
        this.savedStateProvince = '//span[@id="saved-stateProvince"]';
        this.savedPostalCode = '//span[@id="saved-postalCode"]';
        this.savedCountry = '//span[@id="saved-country"]';

        // Add this to your constructor:
        this.firstNameInput = '//input[@id="firstName"]';
        this.saveButton = '//button[@id="submit"]'; // assuming submit button saves edits
    }
    
    async addContact(firstName, lastName, birthdate, email, phone, street1, street2, city, stateProvince, postalCode, country)
    {
        await this.page.locator(this.addcontact).click();
        await this.page.locator(this.FirstNameInput).fill(firstName);
        await this.page.locator(this.LastNameInput).fill(lastName);
        await this.page.locator(this.DOBInput).fill(birthdate);
        await this.page.locator(this.EmailInput).fill(email);
        await this.page.locator(this.PhoneInput).fill(phone);
        await this.page.locator(this.Street1Input).fill(street1);
        await this.page.locator(this.Street2Input).fill(street2);
        await this.page.locator(this.CityInput).fill(city);
        await this.page.locator(this.StateInput).fill(stateProvince);
        await this.page.locator(this.PostalInput).fill(postalCode);
        await this.page.locator(this.CountryInput).fill(country);

        await this.page.waitForTimeout(3000);
        await this.page.locator(this.SubmitButton).click();
    }
    async validateContactCreated(firstName,lastName, birthdate, email, phone, street1, street2, city, stateProvince, postalCode, country)
    {

        await this.viewContact(firstName, lastName);

        const firstNameValidation = await this.page.locator(this.savedFirstName);
        const lastNameValidation = await this.page.locator(this.savedLastName);
        const birthdateValidation = await this.page.locator(this.savedDOB);
        const phoneValidation = await this.page.locator(this.savedPhone);
        const emailValidation = await this.page.locator(this.savedEmail);
        const street1Validation = await this.page.locator(this.savedStreet1);
        const street2Validation = await this.page.locator(this.savedStreet2);
        const cityValidation = await this.page.locator(this.savedCity);
        const stateProvinceValidation = await this.page.locator(this.savedStateProvince);
        const postalCodeValidation = await this.page.locator(this.savedPostalCode);
        const countryValidation = await this.page.locator(this.savedCountry);
        
        await expect(firstNameValidation).toHaveText(firstName);
        await expect(lastNameValidation).toHaveText(lastName);
        await expect(phoneValidation).toHaveText(birthdate);
        await expect(emailValidation).toHaveText(email);
        await expect(birthdateValidation).toHaveText(phone);
        await expect(street1Validation).toHaveText(street1);
        await expect(street2Validation).toHaveText(street2);
        await expect(cityValidation).toHaveText(city);
        await expect(stateProvinceValidation).toHaveText(stateProvince);
        await expect(postalCodeValidation).toHaveText(postalCode);
        await expect(countryValidation).toHaveText(country);
    }

    async viewContact(fname, lname) {
        const fullName = `${fname} ${lname}`;
        // Wait for the row containing the full name and click it
        await this.page.locator(`//tr[td[text()='${fullName}']]`).first().click();
    
        // Validate the contact detail page
        const expfname = this.page.locator('//span[@id="firstName"]');
        const explname = this.page.locator('//span[@id="lastName"]');
        await expect(expfname).toHaveText(fname);
        await expect(explname).toHaveText(lname);
    }

    async contactEdit(newFirstName) {
        await this.page.locator(this.editbutton).click();
        await this.page.waitForSelector(this.firstNameInput); // ensure field is present
        await this.page.locator(this.firstNameInput).fill(''); // clear existing
        await this.page.locator(this.firstNameInput).fill(newFirstName);
        await this.page.locator(this.saveButton).click();
    }
    async contactDelete()
    {
        await this.page,waitForTimeout(2000);
        this.page.once('dialog',async dialog =>{
            console.log('Dialog message: ${dialog.message()}');
            await dialog.accept();
        });
        await this.page.locator(this.deleteContact).click()
    }
}