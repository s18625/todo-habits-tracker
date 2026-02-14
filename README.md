# DailyTracker - Todo + Daily Habits

Prosta aplikacja webowa typu Todo + Daily Habits Tracker, działająca w przeglądarce (mobile-first), bez backendu, z zapisem w `localStorage`.

## Funkcje

- **Lista zadań (Todo)**: dodawanie, edycja, usuwanie, oznaczanie jako zrobione, filtrowanie.
- **Nawyki dzienne**:
  - Śledzenie spożycia wody (litry) z szybkimi przyciskami (+0.25L, +0.5L, +1.0L).
  - Pasek postępu wody względem dziennego celu.
  - Checkboxy dla Kreatyny, Kolagenu i Suplementów.
- **Własne nawyki**: Możliwość dodawania własnych nawyków (typ checkbox lub liczba) w ustawieniach.
- **Notatki**: Pole "Notatka dla dnia" do zapisywania przemyśleń.
- **Statystyki i Wykresy**:
  - Podsumowanie 7 i 30 dni.
  - Wykresy spożycia wody i wykonanych zadań (ostatnie 14 dni).
  - Śledzenie serii (streaks) dla wody, kreatyny i kolagenu.
- **Historia**: Podsumowanie ostatnich 7 dni (woda, nawyki, postęp zadań, notatki).
- **PWA (Progressive Web App)**: Możliwość instalacji na telefonie/komputerze, działanie offline.
- **Eksport/Import**: Możliwość pobrania wszystkich danych do pliku JSON i ich przywrócenia.
- **Nawigacja**: Wygodne taby (Dziś, Historia, Statystyki, Ustawienia).
- **Tryb ciemny/jasny**: Automatyczne dopasowanie i możliwość ręcznej zmiany.
- **Język**: Całość w języku polskim.

## Eksport i Import danych

W zakładce **Ustawienia** znajdziesz sekcję "Dane i kopia zapasowa":
1. **Eksportuj**: Pobiera plik `.json` ze wszystkimi Twoimi danymi (nawyki, zadania, ustawienia).
2. **Importuj**: Pozwala wgrać wcześniej pobrany plik. **Uwaga**: Importowanie nadpisze wszystkie obecne dane w przeglądarce.

## PWA (Instalacja)

Aplikacja wspiera standard PWA. Aby zainstalować ją na telefonie:
- **Android (Chrome)**: Kliknij "Dodaj do ekranu głównego" w menu przeglądarki.
- **iOS (Safari)**: Kliknij ikonę udostępniania i wybierz "Do ekranu początkowego".

## Technologia

- **React + Vite**
- **TypeScript**
- **Tailwind CSS v4** (stylizacja)
- **Recharts** (wykresy)
- **Vite PWA Plugin** (obsługa PWA)
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

## Model danych

Dane są przechowywane w `localStorage` pod kluczami:
- `app_settings`: Globalne ustawienia (cel wody, własne nawyki).
- `daily_YYYY-MM-DD`: Dane dla konkretnego dnia (woda, nawyki, lista zadań, notatka).
- `theme`: Wybrany motyw (jasny/ciemny).
