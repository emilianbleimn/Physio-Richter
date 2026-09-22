# Physiotherapie Sandra Richter — Website-Entwurf

Einseitige Website als **Vorschau für die Praxis**. Sie zeigt Aufbau, Stil und
Tonfall — noch keine fertige, veröffentlichungsreife Seite (siehe
[Vor dem Livegang](#vor-dem-livegang)).

## Woher die Inhalte stammen

Es gibt keine bestehende Website: `physio-richter.com` leitet per 301 auf die
Facebook-Seite der Praxis weiter. Alles Belegte kommt deshalb von dort.

**Belegt** (aus dem öffentlichen Facebook-Profil der Praxis):

| Angabe | Quelle |
| --- | --- |
| Höchster Straße 20, Groß-Umstadt | Profilangabe „Seite · Physiotherapeut/in“ |
| Barrierefreie Praxisräume und Toiletten | Intro-Text des Profils |
| Die acht Therapieformen | Leistungsliste im Intro-Text |
| Kiefergelenkserkrankungen als Teil der Manuellen Therapie | ebenda, wörtlich übernommen |
| Spiegeltherapie, Bobath für Erwachsene | Beiträge vom 1. / 8. / 15. Juli und 6. August |
| „Von 100 % empfohlen (5 Bewertungen)“ | Bewertungsangabe des Profils |
| Porträtfoto | Profilbild der Facebook-Seite |
| Telefon 0160 95434511 | von der Praxis bestätigt |
| Sprechzeiten Mo/Mi/Do 08–16, Di/Fr 08–13 | von der Praxis bestätigt |

Die Postleitzahl **64823** ist ergänzt (Groß-Umstadt) und sollte trotzdem
gegengelesen werden.

**Noch offen** — auf der Seite orange und gepunktet unterstrichen, damit beim
Durchsehen sofort auffällt, was fehlt:

- E-Mail-Adresse
- Kassenzulassung, Privat- und Selbstzahlerleistungen, Preise
- Hinweise zum ersten Termin (Versichertenkarte, Zuzahlung, Ausfallregelung)
- Ein persönlicher Absatz von Sandra Richter im Abschnitt „Über die Praxis“

Zur Telefonnummer: In Branchenverzeichnissen standen zwei verschiedene Einträge
für die Praxis — einer mit `0160 95434511` an der Höchster Straße 20, einer mit
`06078 7821872` an einer Adresse „Am Gewerbepark 21“. Die Praxis hat die erste
Nummer bestätigt; der zweite Eintrag ist veraltet oder falsch.

Die Beschreibungstexte der Therapieformen und die Abschnitte „Ablauf“ und
„Über die Praxis“ sind fachlich übliche Formulierungen, aber **Entwürfe** — sie
gehören von Sandra Richter gegengelesen, bevor die Seite online geht.

## Gestaltung

| Rolle | Wert | Gedanke |
| --- | --- | --- |
| Petrol | `#0F6259`, dunkel `#63C2B3` | ruhig und medizinisch, ohne das ausgetretene Praxisblau |
| Papier | `#F7F5F1` → `#E8E4DB` | warmes Off-White statt kaltem Weiß |
| Tinte | `#12201E` / `#4B5956` | fast schwarz mit einem Grünstich |
| Hinweis | `#9A5A32` | nur für offene Angaben, taucht sonst nirgends auf |

* **Überschriften:** Manrope — geometrische Grotesk, freundlich, gut lesbar
* **Fließtext:** Inter — auf Bildschirmen belastbar, auch in kleinen Graden
* Eine einzige Akzentfarbe, keine Verläufe, keine Schmuckelemente. Die Seite
  soll beim ersten Blick beantworten, was die Praxis macht und wo sie ist.

Das helle Theme ist der Standard — bewusst unabhängig von der
Systemeinstellung des Geräts: Wer ein dunkles Betriebssystem nutzt, soll die
Praxisseite trotzdem zuerst hell sehen. Dunkel ist über den Schalter in der
Kopfzeile erreichbar und wird pro Gerät gemerkt. Ein kurzes Skript im Kopf der
Seite setzt eine gespeicherte Wahl noch vor dem ersten Anstrich, damit für
diese Besucher nichts aufblitzt.

### Barrierefreiheit

Die Praxis wirbt mit barrierefreien Räumen — die Seite sollte das einlösen.
Geprüft mit axe-core (WCAG 2.1 A/AA + Best Practices), **0 Verstöße** in hell
und dunkel, mobil und am Schreibtisch:

- Kontrastwerte sind nachgerechnet, nicht geschätzt (mindestens 4,8:1 für
  Kleintext; `--ink-faint` wurde dafür von `#77857F` auf `#5E6A66` abgedunkelt)
- Sprunglink zum Inhalt, sichtbarer Fokusrahmen auf allen Bedienelementen
- Semantische Auszeichnung: `dl`/`dt`/`dd` für die Kontaktangaben, `th` mit
  `scope` in der Sprechzeitentabelle, beschriftete Formularfelder
- `prefers-reduced-motion` schaltet Bewegungen ab
- Ohne JavaScript bleibt die Seite vollständig lesbar und bedienbar

### Strukturierte Daten

Adresse, Telefonnummer, Sprechzeiten und das Leistungsangebot stehen zusätzlich
als JSON-LD (`schema.org/Physiotherapy`) im Kopf der Seite. Damit finden
Suchmaschinen und Kartendienste die Öffnungszeiten maschinenlesbar vor, statt
sie aus dem Fließtext raten zu müssen. Ändern sich die Zeiten, muss der Block
**mitgeändert werden** — er steht direkt unter der Stylesheet-Zeile in
`index.html`.

### Schriften liegen auf dem eigenen Server

Bewusst **nicht** über die Google-Fonts-CDN eingebunden: Dabei wird die
IP-Adresse jeder Besucherin an einen Dritten in den USA übertragen. Für eine
Gesundheitspraxis ist das ein vermeidbares Risiko — das LG München I hat dazu
2022 entschieden (Az. 3 O 17493/20). Die vier woff2-Dateien liegen in
`assets/fonts/` und laden von der eigenen Domain. Es sind variable Schnitte,
einer deckt alle Gewichte ab.

Aus demselben Grund ist **keine Google-Maps-Karte** eingebettet, sondern nur
ein Link auf OpenStreetMap.

## Vor dem Livegang

1. **Impressum und Datenschutzerklärung** ergänzen. Beides ist für eine Praxis
   rechtlich verpflichtend (§ 5 DDG, Art. 13 DSGVO); im Fußbereich sind die
   Links angelegt, aber deaktiviert.
2. **Das Terminformular ist eine Attrappe.** Es versendet nichts, sondern zeigt
   nur eine Bestätigung an. Für den Livegang muss es an ein Postfach oder ein
   Buchungstool angebunden werden — mitsamt Verschlüsselung und einem echten
   Link zur Datenschutzerklärung an der Einwilligung.
3. Die restlichen offenen Angaben aus der Liste oben eintragen (E-Mail, Preise).
4. `og:url` in `index.html` auf die endgültige Adresse setzen und ein
   `og:image` ergänzen (1200 × 630 px), damit beim Versenden des Links eine
   Vorschaukarte erscheint. Das Profilfoto ist mit 200 × 200 px dafür zu klein.

## Aufbau

```
index.html
assets/css/style.css
assets/js/main.js
assets/fonts/          Inter und Manrope, variabel, latin + latin-ext
assets/img/            Porträtfoto
```

Kein Build-Schritt, keine Abhängigkeiten. Statische Dateien, die auf jedem
Webspace laufen.

## Ansehen

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Veröffentlichen

**Einmalig einzurichten:** Repository → **Settings → Pages** → unter *Source*
**GitHub Actions** auswählen. Danach veröffentlicht der Workflow
`.github/workflows/pages.yml` die Seite bei jedem Push automatisch unter
<https://emilianbleimn.github.io/Physio-Richter/>.

Dieser eine Schritt lässt sich nicht automatisieren: Der `GITHUB_TOKEN` eines
Workflows darf eine Pages-Site deployen, aber nicht erstmalig anlegen.

Von einer anderen Branch aus geht das Deployen nicht: Die Umgebung
`github-pages` lässt per Branch-Schutzregel nur die als Pages-Quelle
eingestellte Branch zu, alles andere wird schon am Umgebungs-Gate abgewiesen.

Die `og:url`-Angabe in `index.html` zeigt auf genau diese Adresse. Bei einer
eigenen Domain muss sie angepasst werden.
