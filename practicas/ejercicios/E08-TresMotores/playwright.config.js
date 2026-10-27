// Configuración de Playwright: las mismas pruebas en los tres motores. No hace falta modificarla.
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  use: { baseURL: 'http://localhost:3508' },
  // Arranca el servidor de la página antes de las pruebas (o usa el del Dev Container)
  webServer: {
    command: 'npx --yes serve@14.2.6 --no-clipboard --listen 3508 .',
    url: 'http://localhost:3508',
    reuseExistingServer: true,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
