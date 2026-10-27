import { test, expect } from '@playwright/test';

test('muestra el título de la página', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Calculadora de propinas');
});

// TODO: añade el resto de pruebas del enunciado
