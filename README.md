# DailyTracker - Todo + Daily Habits

Prosta aplikacja webowa typu Todo + Daily Habits Tracker, działająca w przeglądarce (mobile-first), bez backendu, z zapisem w `localStorage`.

## Funkcje

- **Lista zadań (Todo)**: dodawanie, edycja, usuwanie, oznaczanie jako zrobione, filtrowanie.
- **Nawyki dzienne**:
  - Śledzenie spożycia wody (litry) z szybkimi przyciskami (+0.25L, +0.5L, +1.0L).
  - Pasek postępu wody względem dziennego celu.
  - Checkboxy dla Kreatyny i Kolagenu.
- **Historia**: Podsumowanie ostatnich 7 dni (woda, nawyki, postęp zadań).
- ** Nawigacja datami**: Możliwość przeglądania i edycji danych dla dowolnego dnia.
- **Ustawienia**: Możliwość zmiany dziennego celu spożycia wody.
- **Tryb ciemny/jasny**: Automatyczne dopasowanie i możliwość ręcznej zmiany.
- **Język**: Całość w języku polskim.

## Technologia

- **React + Vite**
- **TypeScript**
- **Tailwind CSS v4** (stylizacja)
- **Lucide React** (ikony)
- **date-fns** (operacje na datach)

## Uruchomienie lokalne

1. Sklonuj repozytorium.
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Uruchom serwer deweloperski:
   ```bash
   npm run dev
   ```
4. Otwórz `http://localhost:5173` w przeglądarce.

## Deployment na GitHub Pages

Aplikacja jest skonfigurowana do łatwego wdrożenia na GitHub Pages.

1. Zainstaluj `gh-pages` (już jest w `devDependencies`):
   ```bash
   npm install
   ```
2. Jeśli wdrażasz na własny profil, upewnij się, że w `vite.config.ts` wartość `base` jest odpowiednio ustawiona (obecnie `./` dla uniwersalności).
3. Uruchom skrypt deploy:
   ```bash
   npm run deploy
   ```
   *Uwaga: Musisz mieć zainicjalizowane repozytorium git i ustawiony remote `origin`.*

## Model danych

Dane są przechowywane w `localStorage` pod kluczami:
- `app_settings`: Globalne ustawienia (np. cel wody).
- `daily_YYYY-MM-DD`: Dane dla konkretnego dnia (woda, nawyki, lista zadań).
- `theme`: Wybrany motyw (jasny/ciemny).

Zmiana danych w jednym widoku (np. dodanie zadania) automatycznie odświeża podsumowanie w historii dzięki systemowi zdarzeń.
