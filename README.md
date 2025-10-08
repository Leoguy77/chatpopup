# Mesh Hessen Chat Widget

## 🎯 Übersicht

Das Mesh Chat Widget ist eine **vollständig eigenständige Lösung** zum Anzeigen von Live-Nachrichten aus der Mesh Hessen Community. Es benötigt nur eine einzige JavaScript-Datei!

## 🚀 Schnellstart

### 1. Datei herunterladen
Lade die Datei `mesh-chat-widget.js` herunter.

### 2. In deine Website einbinden
```html
<!-- Einfach diese Zeile vor dem schließenden </body> Tag einfügen: -->
<script src="mesh-chat-widget.js"></script>
```

**Das war's!** Das Widget erscheint automatisch unten rechts auf deiner Seite.

## ⚙️ Konfiguration (Optional)

Wenn du das Widget anpassen möchtest:

```html
<script src="mesh-chat-widget.js"></script>
<script>
// Eigene Konfiguration nach dem Laden:
window.meshChatWidget.destroy(); // Altes Widget entfernen
window.meshChatWidget = new MeshChatWidget({
    title: 'Mein Chat',
    refreshInterval: 15000,  // Aktualisierung alle 15 Sekunden
    maxMessages: 30,         // Maximal 30 Nachrichten anzeigen
    apiUrl: 'https://meshview.lsinfra.de/api/chat'
});
</script>
```

### Verfügbare Optionen:

| Option | Standard | Beschreibung |
|--------|----------|--------------|
| `title` | "MESH HESSEN Chat" | Titel im Widget-Header |
| `refreshInterval` | 30000 | Auto-Update Intervall in Millisekunden |
| `maxMessages` | 50 | Maximale Anzahl angezeigter Nachrichten |
| `apiUrl` | "https://meshview.lsinfra.de/api/chat" | API Endpunkt |

## 🎮 Steuerung

Du kannst das Widget programmatisch steuern:

```javascript
// Widget anzeigen/verstecken
window.meshChatWidget.show();
window.meshChatWidget.hide();

// Nachrichten manuell aktualisieren
window.meshChatWidget.loadMessages(true);

// Widget minimieren/maximieren
window.meshChatWidget.toggleMinimize();

// Widget komplett entfernen
window.meshChatWidget.destroy();
```

## 📱 Features

✅ **Live API-Verbindung** - direkte Verbindung zur Mesh Hessen API  
✅ **Vollständig standalone** - keine externen Abhängigkeiten  
✅ **Responsive Design** - funktioniert auf allen Geräten  
✅ **Auto-Updates** - lädt neue Nachrichten automatisch  
✅ **Mesh Hessen Design** - passt perfekt zur Community  
✅ **Minimieren/Maximieren** - Platz sparen bei Bedarf  
✅ **Scroll-Management** - automatisches Scrollen zu neuen Nachrichten  
✅ **Zeitstempel** - intelligente Zeitanzeigen (vor 5m, vor 2h, etc.)  
✅ **Kanal-Badges** - verschiedene Farben für verschiedene Kanäle  

## 🛠 Technische Details

- **Dateigröße**: ~25KB (unkomprimiert)
- **Abhängigkeiten**: Keine
- **Browser-Support**: Alle modernen Browser (ES6+)
- **Performance**: Inkrementelle Updates, keine DOM-Rebuilds
- **Speicher**: Automatische Bereinigung alter Nachrichten

## 🎨 Design

Das Widget verwendet das offizielle Mesh Hessen Design:
- **Farben**: `#2c3e50` (Dunkelblau), `#34495e` (Grau)
- **Schrift**: Segoe UI (System-Schrift)
- **Effekte**: Backdrop-Filter, Schatten, sanfte Animationen

## 🔧 Anpassungen

Das CSS ist direkt in der JavaScript-Datei eingebettet. Für eigene Styles kannst du diese überschreiben:

```css
/* Beispiel: Widget-Position ändern */
.mesh-chat-widget {
    bottom: 10px !important;
    right: 10px !important;
    width: 300px !important;
}

/* Beispiel: Eigene Farben */
.mesh-chat-header {
    background: linear-gradient(135deg, #e74c3c, #c0392b) !important;
}
```

## 📝 Demo

Öffne `index.html` für eine Live-Demo mit allen Features.

## 🚨 Wichtige Hinweise

1. **API-Verbindung**: Das Widget verbindet sich direkt mit der Mesh Hessen API - keine Proxy-Server mehr nötig!

2. **Performance**: Das Widget lädt maximal 50 Nachrichten und aktualisiert nur neue Inhalte.

3. **Mobile**: Auf kleinen Bildschirmen wird das Widget fullscreen angezeigt.

4. **Auto-Start**: Das Widget startet automatisch beim Laden der Seite.

## 🆘 Problembehebung

**Widget erscheint nicht:**
- Prüfe die Browser-Konsole auf Fehler
- Stelle sicher, dass JavaScript aktiviert ist

**Keine Nachrichten:**
- Prüfe die Internetverbindung
- Schaue in die Browser-Konsole für API-Fehler

**Performance-Probleme:**
- Reduziere `maxMessages` in der Konfiguration
- Erhöhe `refreshInterval` für weniger Updates

---

💬 **Support**: Bei Fragen oder Problemen erstelle ein Issue oder kontaktiere die Mesh Hessen Community.
