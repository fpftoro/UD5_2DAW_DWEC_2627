import { test, expect } from '@playwright/test';

test('al cargar se ven las tres columnas', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 2 })).toHaveCount(3);
});

// TODO: añade el resto de recorridos del enunciado
