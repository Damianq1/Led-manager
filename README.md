# 📱 LED Manager - Instrukcja instalacji

## Metoda 1: Instalacja jako PWA (najprostsza, bez APK)

### Na telefonie Android:

1. **Skopiuj folder `led-manager` na serwer lub komputer**
   - Możesz użyć dowolnego hostingu (np. GitHub Pages - darmowy)
   - Lub uruchomić lokalny serwer na komputerze

2. **Uruchom serwer lokalny** (na komputerze):
   ```bash
   cd led-manager
   python -m http.server 8080
   ```
   
3. **Na telefonie otwórz Chrome** i wpisz:
   ```
   http://ADRES_IP_KOMPUTERA:8080/app.html
   ```
   (np. http://192.168.1.100:8080/app.html)

4. **Zainstaluj jako aplikację:**
   - Kliknij menu (3 kropki) → **"Dodaj do ekranu głównego"**
   - Lub poczekaj na automatyczny baner instalacji

5. **Gotowe!** Aplikacja pojawi się na pulpicie jak normalna app.

---

## Metoda 2: Generowanie pliku APK (plik instalacyjny)

### Krok 1: Hostuj aplikację online

Najprostszy sposób - **GitHub Pages** (darmowy):

1. Utwórz konto na https://github.com
2. Utwórz nowe repozytorium (np. "led-manager")
3. Wgraj pliki z folderu `led-manager`
4. Włącz GitHub Pages w Settings → Pages
5. Twoja aplikacja będzie dostępna pod adresem:
   `https://TWOJA_NAZWA.github.io/led-manager/app.html`

### Krok 2: Wygeneruj APK przez PWABuilder

1. Otwórz https://www.pwabuilder.com
2. Wklej URL swojej aplikacji
3. Kliknij "Start"
4. Przejdź do zakładki "Android"
5. Kliknij "Generate" → "Download"
6. Pobierzesz plik `.apk`

### Krok 3: Zainstaluj APK na telefonie

1. Skopiuj plik `.apk` na telefon
2. Otwórz plik (może wymagać włączenia "Nieznane źródła" w ustawieniach)
3. Zainstaluj
4. Gotowe! 🎉

---

## Metoda 3: Aplikacja offline (bez internetu)

Jeśli chcesz używać aplikacji całkowicie offline:

1. Otwórz `app.html` w Chrome na telefonie (przez `file://` lub serwer)
2. Zainstaluj jako PWA
3. Aplikacja będzie działać offline!

**Uwaga:** Skanowanie sieci wymaga połączenia z WiFi.

---

## 🔧 Rozwiązywanie problemów

### "Nie mogę połączyć się z urządzeniem"
- Upewnij się, że telefon jest w tej samej sieci WiFi co ESP32
- Lub połącz się bezpośrednio z siecią "Sypialnia LED" (AP urządzenia)
- Sprawdź czy wpisałeś poprawny adres IP

### "Skanowanie nie znajduje urządzeń"
- Skanowanie działa tylko w sieci lokalnej
- Spróbuj ręcznie wpisać IP: `192.168.4.1` (domyślny AP ESP32)

### "Aplikacja nie instaluje się jako PWA"
- Użyj Chrome (nie Firefox/Samsung Browser)
- Strona musi być serwowana przez HTTP/HTTPS (nie file://)

---

## 📁 Struktura plików

```
led-manager/
├── app.html           ← Główna aplikacja (używaj tego!)
├── index.html         ← Starsza wersja
├── manifest.json      ← Manifest PWA
├── sw.js              ← Service Worker (offline)
├── generate-icons.html ← Generator ikon
└── INSTRUKCJA.md      ← Ten plik
```

---

## 🌐 Wymagane adresy na ESP32

Aplikacja komunikuje się z ESP32 przez te endpointy:
- `GET /status` - pobiera aktualny stan
- `GET /power?state=0|1` - włącza/wyłącza
- `GET /color?cold=X&warm=Y` - ustawia kolor
- `GET /brightness?value=X` - ustawia jasność
- `GET /animation?type=X` - ustawia animację startową

Wszystkie endpointy muszą zwracać nagłówki CORS!
