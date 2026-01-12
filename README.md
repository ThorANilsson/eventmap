[Klicka här för att komma direkt till API dokumentationen](https://thoranilsson.github.io/eventmap/)

Eventmap består av två delar: backend och frontend. Det finns det vill säga ingen databas som komponent i projektet. En API-nyckel till Ticketmaster är nödvändig för att köra projektet, en sådan har bifogats i inlämningen. Eventmap kan köras lokalt på din dator på två olika vis, se nedan.

## Alternativ 1: Kör med Docker (snabbast att komma igång)

**Välj detta om du vill:**
- Starta projektet utan att installera .NET, Node eller andra dependencies. 
- Köra färdigbyggda artefakter.
- Se projektet i sin fulla form snabbt.

**Nackdel:** Kodändringar reflekteras inte lokalt. Kan kännas konstigt om du aldrig använt Docker förr.

[Klicka här](#1-kör-projektet-med-docker-) för att komma till instruktionerna.

## Alternativ 2: Kör på traditionellt vis (för utveckling)

**Välj detta om du vill:**
- Utveckla och göra ändringar i koden.
- Köra backend och frontend i development‑läge.
- Ha full kontroll över miljön.

**Nackdel:** Kräver installationer och manuell setup, ökad risk för plattform- och dependency relaterade fel.

[Klicka här](#2-bygg-och-kör-projektet-på-traditionellt-vis) för att komma till instruktionerna.

## 1. Kör projektet med Docker 🐋
Om du har Docker på din dator så kan **hela** projektet startas med ett (1) enda kommando utan att du behöver installera några dependencies manuellt. Vi valde att erbjuda en Docker-variant av projektet mest för eget lärande.

### Du behöver:
* Docker (inkl. Docker Compose, vilket följer med Docker Desktop).
* En terminal som kan köra vanliga kommandon (t.ex. Git Bash, PowerShell, Terminal på macOS).
* Ticketmaster API nyckel.
  
### Så gör du:
1. Klona hela detta repo eller enbart filen docker-compose.yml och placera i en mapp.
2. Öppna en terminal, förslagsvis Git Bash, i samma mapp som docker-compose.yml finns i.
3. Kör följande kommando:
   `TICKETMASTER_API_KEY={NYCKEL HÄR} docker compose up`
   
   *Byt ut {NYCKEL HÄR} med din Ticketmaster API nyckel.*
   
5. Om allt gick bra kan du nu besöka http://localhost:3000/ och använda Eventmap.

> [!NOTE]
> När du kör projektet med Docker enligt instruktionera ovan så hämtas färdigbyggda artefakter från Github Container registry. Alltså byggs inte projektet lokalt på din dator och eventuella kodändringar du gör kommer inte märkas. Vi byggde artefakterna måndag 12/1.

## 2. Bygg och kör projektet på traditionellt vis
Om detta avsnitt följs kommer projektet byggas lokalt på din dator och du kan göra ändringar i koden som kommer reflekteras i produkten. Projektet kommer vara i "development mode" vilket bl.a innebär försämrad prestanda.

### Du behöver:
* .NET 10.x SDK.
* Node.js LTS (18.x eller 20.x).
* Node package manager (kommer ofta tillsammans med Node.js).
* En terminal som kan köra vanliga kommandon (t.ex. Git Bash, PowerShell, Terminal på macOS).
* Grundläggande JSON-kunskap.
* Ticketmaster API nyckel.

### Så gör du:
1. Klona hela detta repo.
2. Öppna ./backend foldern och skapa en kopia av filen "appsettings.json". Döp kopian till "appsettings.Development.json".
3. Öppna kopian och lägg till följande objekt på samma nivå som "Logging"-objektet.
   ```
    {
      "Ticketmaster": {
        "ApiKey": "{NYCKEL HÄR}"
      }
    }
   ```
   *Byt ut {NYCKEL HÄR} med din Ticketmaster API nyckel.*

   *Se till att Ticketmaster‑objektet ligger på samma nivå som Logging och AllowedHosts, inte inuti dem.*   
5. Öppna en terminal och navigera till ./backend foldern.
6. Kör kommandot: `dotnet run`.
Om allt gick bra kommer backend servern nu vara igång på localhost:5020.
7. I en ny terminal, navigera till ./frontend foldern.
8. Kör följande kommandon i ordning:
   1. `npm i`.
   2. `npm run dev`.
9. Om allt gick bra kan du nu besöka http://localhost:3000 och använda Eventmap.
