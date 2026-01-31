import { test, expect } from '@playwright/test';

test.describe('Add Sollicitatie E2E Tests', () => {
  const baseUrl = 'http://localhost:4200';
  const testEmail = 'test@test.nl';
  const testPassword = '123456';

  // Voorbereidingen voor elke test
  test.beforeEach(async ({ page, context }) => {
    // Navigeer naar de login pagina
    await page.goto(`${baseUrl}/login`);
    
    // Verwerk eventuele persoonlijke gegevens-prompts
    await context.clearCookies();
  });

  test('should successfully add a new sollicitatie', async ({ page }) => {
    // Stap 1: Login
    // Email field invullen
    await page.fill('input[type="email"]', testEmail);
    // Password field invullen
    await page.fill('input[type="password"]', testPassword);
    // Login button klikken
    await page.click('button[type="submit"]:has-text("Login")');
    
    // Wacht op navigatie naar de main page
    await page.waitForURL(`${baseUrl}/sollicitaties`);
    
    // Stap 2: Navigeer naar 'Add Sollicitatie' pagina
    await page.click('a:has-text("Add"), button:has-text("Add")')
    await page.waitForURL(`${baseUrl}/add-sollicitatie`);
    
    // Stap 3: Vul het formulier in
    const today = new Date();
    const dateString = today.toLocaleDateString('nl-NL');
    
    // Datum invullen
    await page.click('[data-test="date_picker_datum"]');
     // Selecteer een datum
    await page.click(`button:has-text("${today.getDate().toString()}")`);

    // await page.fill('input[formControlName="datum"]', dateString);
    
    // Bedrijf invullen
    await page.fill('input[formControlName="bedrijf"]', 'TechCorp Nederland');
    
    // Aanvraag invullen
    await page.fill('textarea[formControlName="aanvraag"]', 'Dit is een test aanvraag voor een Senior Developer positie.');
    
    // Locatie invullen
    await page.fill('input[formControlName="locatie"]', 'Amsterdam');
    
    // Motivatie invullen
    await page.fill('textarea[formControlName="motivatie"]', 'Ik ben zeer gemotiveerd om te werken bij TechCorp en wil graag mijn vaardigheden inzetten.');
    
    // Updates invullen (optioneel)
    await page.fill('textarea[formControlName="updates"]', 'Eerste sollicitatie ronde afgerond');
    
    // Status selecteren (pending is standaard)
    await page.click('input[value="pending"]', {force: true});
    
    // Stap 4: Verzend het formulier
    const submitButton = page.locator('button[type="submit"]:has-text("OK")');
    await submitButton.scrollIntoViewIfNeeded();
    // Dit vuurt het click-event direct af in de DOM van de browser
    // dit verhelpt dat de klik op het element niet geregistreerd word
    await submitButton.dispatchEvent('click');
    
    // Stap 5: Verifieer dat we naar de sollicitaties pagina zijn genavigeerd
    await page.waitForURL(`${baseUrl}/sollicitaties`);
    
    // Stap 6: Verifieer dat de nieuwe sollicitatie in de lijst verschijnt
    const sollicitatieRow = page.locator('text=TechCorp Nederland').first();
    await expect(sollicitatieRow).toBeVisible();
  });

  test('should show validation errors when submitting empty form', async ({ page }) => {
    // Navigeer naar add page
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]:has-text("Login")');
    
    await page.waitForURL(`${baseUrl}/sollicitaties`);
    await page.click('a:has-text("Add"), button:has-text("Add")');
    
    // Probeer formulier in te dienen zonder invullen
    const submitButton = page.locator('button[type="submit"]:has-text("OK")');
    
    // Button moet disabled zijn
    await expect(submitButton).toBeDisabled();
  });

  test('should cancel form and empty form fields', async ({ page }) => {
    // Navigeer naar add page
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]:has-text("Login")');
    
    await page.waitForURL(`${baseUrl}/sollicitaties`);
    await page.click('a:has-text("Add"), button:has-text("Add")');
    
    // Vul enige data in
    await page.fill('input[formControlName="bedrijf"]', 'Test Bedrijf');
    
    // Klik cancel
    await page.click('[data-test="button_cancel"]');
    
    // Verifieer dat we terug zijn op sollicitaties pagina
    const datumInput = page.locator('[formControlName="datum"]');
    const bedrijfInput = page.locator('input[formControlName="bedrijf"]');
    const locatieInput = page.locator('input[formControlName="locatie"]');
    const aanvraagInput = page.locator('textarea[formControlName="aanvraag"]');
    const motivatieInput = page.locator('textarea[formControlName="motivatie"]');
    const updatesInput = page.locator('textarea[formControlName="updates"]');
    
    await expect(datumInput).toHaveValue('');
    await expect(bedrijfInput).toHaveValue('');
    await expect(locatieInput).toHaveValue('');
    await expect(aanvraagInput).toHaveValue('');
    await expect(motivatieInput).toHaveValue('');
    await expect(updatesInput).toHaveValue('');
  });

  test('should handle datepicker for datum field', async ({ page }) => {
    const today = new Date();
    // Login
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]:has-text("Login")');
    
    await page.waitForURL(`${baseUrl}/sollicitaties`);
    await page.click('a:has-text("add"), button:has-text("add")');
    
    // Open datepicker.
    await page.click('[data-test="date_picker_datum"]');
    
    // Selecteer een datum
    await page.click(`button:has-text("${today.getDate().toString()}")`);
    
    // Verifieer dat datum is ingevuld
    const datumInput = page.locator('input[formControlName="datum"]');
    const value = await datumInput.inputValue();
    expect(value).toBeTruthy();
  });

  test('should use autocomplete for locatie field', async ({ page }) => {
    // Login
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]:has-text("Login")');
    
    await page.waitForURL(`${baseUrl}/sollicitaties`);
    await page.click('a:has-text("Add"), button:has-text("Add")');
    
    // Klik op locatie field
    await page.click('[data-test="input_locatie"]');
    
    // Type een locatie
    await page.fill('input[formControlName="locatie"]', 'Am');
    
    // Verifieer dat autocomplete opent
    const autocompletePanel = page.locator('.mat-mdc-autocomplete-panel');
    await expect(autocompletePanel).toBeVisible();
    
    // Selecteer eerste optie
    const firstOption = page.locator('mat-option').first();
    await firstOption.click();
  });
});