import { test, expect } from '@playwright/test';

test('al cargar se ve el primer panel de la ficha', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Auriculares con cancelación de ruido')).toBeVisible();
});

// TODO: añade el resto de recorridos del enunciado
