# Skeleton-eksempelkode

Når vi henter data fra APIer bør vi gi brukeren en indikasjon på at noe skjer så lenge dataene ikke er ferdighentet; enten det tar 100 millisekunder eller 10 sekunder er visuell feedback viktig i asynkrone grensesnitt. Dette repositoryet inneholder eksempelkode på hvordan du kan hente ut data fra et API og vise et skeleton så lenge dataene er under uthenting.

## Arkitektur

Foruten koden som henter data fra APIet og tegner opp komponentene, er det noen arkitekturvalg du bør legge merke til i dette repositoryet.

### Separation of concerns

Koden er skilt ut i funksjoner og er modularisert i størst mulig grad slik at hver funksjon har et klart bruksområde og klare, deterministiske returverdier. Det vil si at om du alltid gir samme inndata til en funksjon, vil du alltid få samme utdata. Funksjonene er også laget på en sånn måte at de kun forholder seg til de dataene som blir matet inn gjennom parametere; det gjør at funksjonene ikke er avhengige av at markup eller kode utenfor må være strukturert på en bestemt måte for å virke.

**Dette er ønskelig.** Det kan virke som om koden er splittet opp i unødvendig mange filer, men med tanke på gjenbrukbarhet og testbarhet er dette den mest effektive måten å skrive koden på.

### Datahenting

Kode som henter data fra APIet jeg har valgt å bruke i denne oppgaven ligger i `/src/ts/api`. All kode i denne mappen har som sin eneste oppgave å hente data fra APIet og ingenting annet; koden skal ikke bry seg med å lage eller endre HTML, den skal bare hente dataene og returnere dem på forventet måte. Vi har bare én funksjon, `getTechnologyNews()`, som gjør akkurat det: spør APIet om dataene vi er ute etter, gjør filtreringen som trengs for å bare returnere teknologinyheter, og returnerer et array med nyheter når den er ferdigkjørt.

For å utvide med flere datakilder og endepunkter er det bare å lage flere filer og funksjoner i `/src/ts/api` som følger samme tankegang. Dersom vi begynner å skrive fetch-kall i andre filer enn filene som ligger i denne mappa, er det et tegn på at arkitekturen ikke henger på greip. Da bør fetch-kallet skilles ut i en egen fil i denne mappa.

### Opptegning av UI-komponenter

Kode som tegner opp (renderer) grensesnitt-elementene på siden ligger i `/src/ts/components`. Alle funksjoner i denne mappen har som sin eneste oppgave å strukturere HTML på forventet format og returnere denne. Koden skal ikke bry seg med å sette inn HTML-elementene på den ferdige siden; fordi funksjonene skal kunne brukes på en hvilken som helst HTML-side skal de ikke bry seg med den jobben. De skal bare ta i mot data og returnere riktig HTML med dataene i seg.

For å utvide med flere komponenter, for eksempel om man vil ha knapper, andre typer kort, navigasjonsmenyer og lignende, er det bare å lage flere filer og funksjoner i `/src/ts/components`. Dersom vi begynner å tegne opp brukergrensesnitt som kan modulariseres andre steder i kodebasen, er det et tegn på at vi gjør en feil med tanke på arkitekturen, og vi bør heller lage egne filer i denne mappa i stedet.

### Sammensying av funksjonalitet

I `/src/ts/index.ts` skjer magien — her kaller vi på alle de andre funksjonene og syr sammen input og output på riktig måte. Hadde vi hatt flere HTML-sider kunne vi også ha laget f.eks `/src/ts/aboutMe.ts` og `/src/ts/portfolio.ts` som inneholdt logikken for disse spesifikke HTML-sidene, og kalt på funksjonene her. Modulariteten gjør at vi enkelt kan utvide med flere undersider etter behov så lenge vi holder oss til den modulære arkitekturen som er outlinet her.

## Bør jeg bruke denne typen arkitektur i mine kodeprosjekter?

Kort fortalt: **ja.** Navn på filer og mapper kan endre seg ut fra prosjektet, og kommer f.eks an på om man bruker rammeverk eller ikke, og om det er andre tekniske begrensninger man må tenke på. Men som en helhet er det en fordel å bruke modularisert arkitektur som vist her.