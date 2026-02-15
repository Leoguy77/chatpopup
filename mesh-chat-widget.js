/**
 * Mesh Hessen Chat Widget - Standalone Version
 * Einfach diese JavaScript-Datei einbinden und das Widget wird automatisch erstellt
 */

(function() {
    'use strict';

    // CSS Styles direkt einbetten
    const styles = `
        /* Chat Widget CSS - Mesh Hessen Design */
        .mesh-chat-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 350px;
            height: 580px;
            background: #ffffff;
            border: 2px solid #2c3e50;
            border-radius: 16px;
            box-shadow: 0 12px 40px rgba(44, 62, 80, 0.2);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }

        .mesh-chat-widget.minimized {
            height: 60px;
        }

        .mesh-chat-widget.minimized .mesh-chat-messages,
        .mesh-chat-widget.minimized .mesh-chat-footer {
            display: none;
        }

        .mesh-chat-header {
            background: linear-gradient(135deg, #2C2D3C 0%, #3D3E50 50%, #2C2D3C 100%);
            color: white;
            padding: 16px 20px;
            border-radius: 14px 14px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-height: 40px;
            position: relative;
            overflow: hidden;
        }

        .mesh-chat-header h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 0.5px;
            color: #ffffff;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }

        .mesh-chat-header h3::before {
            content: '📡 ';
            font-size: 16px;
            margin-right: 4px;
        }

        .mesh-chat-controls {
            display: flex;
            gap: 8px;
        }

        .mesh-chat-controls button {
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: bold;
            transition: all 0.2s ease;
            backdrop-filter: blur(5px);
        }

        .mesh-chat-controls button:hover {
            background: #67EA94;
            color: #2C2D3C;
            transform: translateY(-1px);
            box-shadow: 0 2px 12px rgba(103, 234, 148, 0.4);
        }

        .mesh-chat-controls .mesh-minimize-wrap {
            position: relative;
            display: inline-flex;
        }

        .mesh-chat-new-badge {
            position: absolute;
            top: -6px;
            right: -6px;
            min-width: 18px;
            height: 18px;
            padding: 0 5px;
            background: #67EA94;
            color: #2C2D3C;
            font-size: 11px;
            font-weight: 700;
            border-radius: 10px;
            display: none;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
            z-index: 1;
        }

        .mesh-chat-new-badge.visible {
            display: flex;
        }

        .mesh-chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: linear-gradient(180deg, #ecf0f1 0%, #f8f9fa 100%);
            display: flex;
            flex-direction: column;
            gap: 12px;
            scroll-behavior: smooth;
            position: relative;
        }

        .mesh-chat-messages::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 20px;
            background: linear-gradient(180deg, rgba(236, 240, 241, 0.8) 0%, transparent 100%);
            pointer-events: none;
            z-index: 1;
        }

        .mesh-chat-messages.initial-load {
            scroll-behavior: auto;
        }

        .mesh-chat-messages::-webkit-scrollbar {
            width: 6px;
        }

        .mesh-chat-messages::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        .mesh-chat-messages::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
        }

        .mesh-chat-messages::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
        }

        .mesh-message {
            background: white;
            padding: 16px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
            border-left: 4px solid #3498db;
            transition: all 0.2s ease;
            position: relative;
            z-index: 2;
        }

        .mesh-message:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(44, 62, 80, 0.15);
            border-left-color: #2c3e50;
        }

        .mesh-message.reply {
            border-left-color: #27ae60;
            margin-left: 24px;
            position: relative;
            background: linear-gradient(135deg, #ffffff 0%, #f8fff8 100%);
        }

        .mesh-message.reply::before {
            content: "↳";
            position: absolute;
            left: -20px;
            top: 16px;
            color: #27ae60;
            font-weight: bold;
            font-size: 18px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .mesh-message-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
            gap: 8px;
        }

        .mesh-message-sender {
            font-weight: 700;
            font-size: 15px;
            color: #2c3e50;
            flex: 1;
            line-height: 1.3;
            letter-spacing: 0.3px;
        }

        .mesh-message-time {
            font-size: 12px;
            color: #7f8c8d;
            white-space: nowrap;
            flex-shrink: 0;
            font-weight: 500;
        }

        .mesh-message-channel {
            display: inline-block;
            background: #34495e;
            color: white;
            font-size: 10px;
            padding: 4px 8px;
            border-radius: 12px;
            margin-left: 8px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .mesh-message-channel.shortSlow { 
            background: linear-gradient(135deg, #3498db, #2980b9); 
        }
        .mesh-message-channel.longFast { 
            background: linear-gradient(135deg, #27ae60, #229954); 
        }
        .mesh-message-channel.meshHessen { 
            background: linear-gradient(135deg, #f39c12, #e67e22); 
        }

        .mesh-message-content {
            color: #2c3e50;
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
            margin-top: 8px;
            font-weight: 400;
        }

        .mesh-loading {
            text-align: center;
            color: #7f8c8d;
            font-style: italic;
            padding: 30px 20px;
            font-weight: 500;
            position: relative;
        }

        .mesh-loading::before {
            content: '📡';
            display: block;
            font-size: 24px;
            margin-bottom: 8px;
            animation: mesh-pulse 2s infinite;
        }

        @keyframes mesh-pulse {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
        }

        .mesh-error {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            padding: 16px;
            border-radius: 12px;
            border-left: 4px solid #a93226;
            text-align: center;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
        }

        .mesh-chat-footer {
            padding: 12px 20px;
            background: linear-gradient(180deg, #ecf0f1 0%, #d5dbdb 100%);
            border-top: 1px solid #bdc3c7;
            border-radius: 0 0 14px 14px;
            font-size: 12px;
            color: #2c3e50;
            text-align: center;
            font-weight: 500;
            position: relative;
        }

        .mesh-chat-footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 20px;
            right: 20px;
            height: 1px;
            background: linear-gradient(90deg, transparent, #bdc3c7, transparent);
        }

        .mesh-scroll-to-bottom {
            position: absolute;
            bottom: 80px;
            right: 20px;
            background: linear-gradient(135deg, #2C2D3C, #3D3E50);
            color: white;
            border: 2px solid #67EA94;
            padding: 10px 16px;
            border-radius: 25px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(103, 234, 148, 0.25);
            z-index: 10001;
            transition: all 0.3s ease;
            opacity: 0.95;
            backdrop-filter: blur(10px);
            letter-spacing: 0.3px;
            display: none;
        }

        .mesh-scroll-to-bottom:hover {
            background: linear-gradient(135deg, #3D3E50, #2C2D3C);
            color: #67EA94;
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(103, 234, 148, 0.4);
            border-color: #67EA94;
        }

        /* Responsive Design - compact floating card on mobile */
        @media (max-width: 768px) {
            .mesh-chat-widget {
                width: min(calc(100vw - 32px), 380px);
                max-width: calc(100vw - 32px);
                height: min(70vh, 520px);
                max-height: 70vh;
                bottom: max(16px, env(safe-area-inset-bottom));
                left: 50%;
                right: auto;
                transform: translateX(-50%);
                border-width: 2px;
                border-radius: 16px;
            }
            
            .mesh-chat-widget.minimized {
                height: 56px;
                width: min(calc(100vw - 32px), 320px);
            }
            
            .mesh-scroll-to-bottom {
                bottom: 80px;
                right: 16px;
            }
        }

        @media (max-width: 480px) {
            .mesh-chat-widget {
                width: calc(100vw - 24px);
                max-width: none;
                height: min(65vh, 460px);
                max-height: 65vh;
                bottom: max(12px, env(safe-area-inset-bottom));
                left: 12px;
                right: 12px;
                transform: none;
                border-radius: 16px;
                border-width: 2px;
            }
            
            .mesh-chat-widget.minimized {
                height: 52px;
                width: calc(100vw - 24px);
                left: 12px;
            }
            
            .mesh-chat-header {
                padding: 12px 16px;
                border-radius: 14px 14px 0 0;
            }
            
            .mesh-chat-header h3 {
                font-size: 15px;
            }
            
            .mesh-chat-messages {
                padding: 12px 16px;
            }
            
            .mesh-message {
                padding: 12px;
            }
            
            .mesh-message-sender {
                font-size: 13px;
            }
            
            .mesh-message-content {
                font-size: 13px;
            }
            
            .mesh-chat-footer {
                padding: 10px 16px;
                font-size: 11px;
            }
            
            .mesh-chat-controls button {
                width: 36px;
                height: 36px;
                min-width: 36px;
                min-height: 36px;
            }
            
            .mesh-scroll-to-bottom {
                bottom: 72px;
                right: 12px;
                padding: 8px 12px;
                font-size: 11px;
            }
        }
    `;

    // Widget-Klasse
    class MeshChatWidget {
        constructor(options = {}) {
            // Konfiguration mit Defaults
            this.apiUrl = options.apiUrl || 'https://meshview.lsinfra.de/api/packets';
            this.refreshInterval = options.refreshInterval || 5000;
            this.maxMessages = options.maxMessages || 100;
            this.title = options.title || 'MESH HESSEN Chat';
            
            // Interne Variablen
            this.messages = [];
            this.isMinimized = false;
            this.isInitialLoad = true;
            this.lastUpdateTime = null;
            this.lastSeenIds = new Set();   // message IDs when user last had widget open / minimized
            this.newBadgeEl = null;
            
            // Widget initialisieren
            this.injectStyles();
            this.createWidget();
            this.bindEvents();
            this.loadMessages();
            this.startAutoRefresh();
            
            // Auf Mobile standardmäßig minimiert starten
            if (this.isMobile()) {
                this.isMinimized = true;
                this.widget.classList.add('minimized');
                this.minimizeBtn.textContent = '+';
            }
        }

        isMobile() {
            return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
        }

        injectStyles() {
            const styleSheet = document.createElement('style');
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        createWidget() {
            // Widget HTML erstellen
            this.widget = document.createElement('div');
            this.widget.className = 'mesh-chat-widget';
            this.widget.innerHTML = `
                <div class="mesh-chat-header">
                    <h3>${this.title}</h3>
                    <div class="mesh-chat-controls">
                        <button class="mesh-refresh-btn" title="Nachrichten aktualisieren">⟳</button>
                        <span class="mesh-minimize-wrap">
                            <span class="mesh-chat-new-badge" aria-hidden="true"></span>
                            <button class="mesh-minimize-btn" title="Minimieren/Maximieren">−</button>
                        </span>
                    </div>
                </div>
                <div class="mesh-chat-messages initial-load">
                    <div class="mesh-loading">Lade Nachrichten...</div>
                </div>
                <div class="mesh-chat-footer">
                    <span class="mesh-last-update">Letzte Aktualisierung: --</span>
                </div>
                <button class="mesh-scroll-to-bottom" style="display: none;">
                    ↓ Neueste Nachrichten
                </button>
            `;

            // Widget ins DOM einfügen
            document.body.appendChild(this.widget);

            // Referenzen speichern
            this.messagesContainer = this.widget.querySelector('.mesh-chat-messages');
            this.refreshBtn = this.widget.querySelector('.mesh-refresh-btn');
            this.minimizeBtn = this.widget.querySelector('.mesh-minimize-btn');
            this.newBadgeEl = this.widget.querySelector('.mesh-chat-new-badge');
            this.lastUpdateSpan = this.widget.querySelector('.mesh-last-update');
            this.scrollToBottomBtn = this.widget.querySelector('.mesh-scroll-to-bottom');
        }

        bindEvents() {
            this.refreshBtn.addEventListener('click', () => {
                this.loadMessages(true);
            });

            this.minimizeBtn.addEventListener('click', () => {
                this.toggleMinimize();
            });

            this.scrollToBottomBtn.addEventListener('click', () => {
                this.scrollToBottom();
                this.scrollToBottomBtn.style.display = 'none';
            });

            this.messagesContainer.addEventListener('scroll', () => {
                this.handleScroll();
            });
        }

        toggleMinimize() {
            this.isMinimized = !this.isMinimized;
            this.widget.classList.toggle('minimized', this.isMinimized);
            this.minimizeBtn.textContent = this.isMinimized ? '+' : '−';
            this.markMessagesSeen();
            this.updateNewBadge();
            if (!this.isMinimized) {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => this.scrollToBottom());
                });
            }
        }

        markMessagesSeen() {
            this.lastSeenIds = new Set(this.messages.map(m => m.id));
        }

        updateNewBadge() {
            if (!this.newBadgeEl) return;
            const count = this.messages.filter(m => !this.lastSeenIds.has(m.id)).length;
            if (count > 0 && this.isMinimized) {
                this.newBadgeEl.textContent = count > 99 ? '99+' : String(count);
                this.newBadgeEl.classList.add('visible');
                this.newBadgeEl.setAttribute('aria-label', count + ' neue Nachrichten');
            } else {
                this.newBadgeEl.classList.remove('visible');
                this.newBadgeEl.removeAttribute('aria-label');
            }
        }

        async loadMessages(forceRefresh = false, isAutoRefresh = false) {
            try {
                // Nur bei erstem Laden oder Force-Refresh loading anzeigen
                if (this.messages.length === 0) {
                    this.showLoading();
                }
                
                // Build URL mit Parametern
                let baseUrl = this.apiUrl;
                // Stelle sicher, dass eine absolute URL verwendet wird
                if (!baseUrl.startsWith('http')) {
                    baseUrl = window.location.origin + (baseUrl.startsWith('/') ? '' : '/') + baseUrl;
                }
                const url = new URL(baseUrl);
                url.searchParams.set('portnum', '1');
                url.searchParams.set('limit', this.maxMessages.toString());
                
                // Bei Updates: nur bei inkrementellem Abruf "since" nutzen (nicht bei Auto-Refresh, damit neue Nachrichten erkannt werden)
                if (this.lastUpdateTime && !forceRefresh && !isAutoRefresh) {
                    url.searchParams.set('since', this.lastUpdateTime);
                }
                
                const response = await fetch(url.toString(), {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                
                if (data.packets && Array.isArray(data.packets)) {
                    if (forceRefresh || this.messages.length === 0) {
                        this.messages = data.packets;
                        this.renderMessages(true);
                        this.markMessagesSeen();
                        this.updateNewBadge();
                    } else if (isAutoRefresh) {
                        // Vollständiger Abruf im Intervall: Liste ersetzen, Badge aus neuen IDs berechnen
                        this.messages = data.packets;
                        this.renderMessages(true);
                        this.updateNewBadge();
                    } else {
                        const existingIds = new Set(this.messages.map(m => m.id));
                        const newMessages = data.packets.filter(packet => !existingIds.has(packet.id));
                        
                        if (newMessages.length > 0) {
                            this.messages = [...this.messages, ...newMessages];
                            this.messages.sort((a, b) => {
                                const timeA = (b.import_time_us || b.import_time);
                                const timeB = (a.import_time_us || a.import_time);
                                return timeA - timeB;
                            });
                            this.messages = this.messages.slice(0, this.maxMessages);
                            this.addNewMessages(newMessages);
                        } else {
                            const domMessageCount = this.messagesContainer.querySelectorAll('.mesh-message').length;
                            if (domMessageCount === 0 && this.messages.length > 0) {
                                this.renderMessages(false);
                            }
                        }
                    }
                    
                    if (data.latest_import_time) {
                        this.lastUpdateTime = data.latest_import_time;
                    }
                    
                    this.updateLastUpdateTime();
                } else {
                    throw new Error('Ungültiges Datenformat erhalten');
                }
                
            } catch (error) {
                console.error('Fehler beim Laden der Nachrichten:', error);
                
                if (!forceRefresh && this.messages.length > 0) {
                    console.log('Auto-Refresh fehlgeschlagen, behalte bestehende Nachrichten');
                    this.updateLastUpdateTime();
                } else {
                    this.showError(`Fehler beim Laden der API: ${error.message}`);
                }
            }
        }





        renderMessages(forceScrollToBottom = false) {
            const wasScrolledToBottom = this.isScrolledToBottom();
            
            this.messagesContainer.innerHTML = '';
            
            if (this.messages.length === 0) {
                this.messagesContainer.innerHTML = '<div class="mesh-loading">Keine Nachrichten verfügbar</div>';
                return;
            }

            // Filter Nachrichten mit gültigem Timestamp und ohne PKI-Channel
            const validMessages = this.messages.filter(m => 
                (m.import_time_us || m.import_time) && m.channel !== 'PKI'
            );
            
            if (validMessages.length === 0) {
                this.messagesContainer.innerHTML = '<div class="mesh-loading">Keine Nachrichten verfügbar</div>';
                return;
            }

            const sortedMessages = [...validMessages].sort((a, b) => {
                const timeA = (a.import_time_us || a.import_time);
                const timeB = (b.import_time_us || b.import_time);
                return timeA - timeB;
            });

            sortedMessages.forEach(message => {
                const messageElement = this.createMessageElement(message);
                this.messagesContainer.appendChild(messageElement);
            });

            if (this.isInitialLoad) {
                setTimeout(() => {
                    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
                    this.messagesContainer.classList.remove('initial-load');
                    this.isInitialLoad = false;
                }, 50);
            } else {
                if (wasScrolledToBottom || forceScrollToBottom) {
                    setTimeout(() => this.scrollToBottom(), 100);
                }
            }
        }

        addNewMessages(newMessages) {
            if (newMessages.length === 0) return;
            
            const wasScrolledToBottom = this.isScrolledToBottom();
            
            // Filter nur Nachrichten mit gültigem Timestamp und ohne PKI-Channel
            const validNewMessages = newMessages.filter(m => 
                (m.import_time_us || m.import_time) && m.channel !== 'PKI'
            );
            
            if (validNewMessages.length === 0) return;
            
            const sortedNewMessages = [...validNewMessages].sort((a, b) => {
                const timeA = (a.import_time_us || a.import_time);
                const timeB = (b.import_time_us || b.import_time);
                return timeA - timeB;
            });

            sortedNewMessages.forEach(message => {
                const messageElement = this.createMessageElement(message);
                this.messagesContainer.appendChild(messageElement);
            });

            this.removeOldMessages();

            if (wasScrolledToBottom) {
                setTimeout(() => this.scrollToBottom(), 100);
            }
            if (this.isMinimized) {
                this.updateNewBadge();
            }
        }

        createMessageElement(message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'mesh-message';
            messageDiv.dataset.messageId = message.id;
            
            if (message.reply_id) {
                messageDiv.classList.add('reply');
            }

            // Prüfe import_time_us zuerst (Mikrosekunden), dann import_time
            const timestamp = message.import_time_us || message.import_time;
            const time = this.formatTime(timestamp);
            
            // Fallback für verschiedene Namenfelder
            let sender = 'Unbekannt';
            if (message.long_name && message.long_name.trim()) {
                sender = message.long_name.trim();
            } else if (message.from_id) {
                sender = message.from_id;
            } else if (message.from_node_id) {
                sender = `Node ${message.from_node_id}`;
            }
            sender = this.sanitizeText(sender);
            
            const content = this.sanitizeText(message.payload || '');
            const channel = this.formatChannel(message.channel);

            messageDiv.innerHTML = `
                <div class="mesh-message-header">
                    <div>
                        <span class="mesh-message-sender">${sender}</span>
                        ${channel ? `<span class="mesh-message-channel ${this.getChannelClass(message.channel)}">${channel}</span>` : ''}
                    </div>
                    <span class="mesh-message-time">${time}</span>
                </div>
                <div class="mesh-message-content">${content}</div>
            `;

            return messageDiv;
        }

        formatTime(timestamp) {
            try {
                if (!timestamp && timestamp !== 0) {
                    return 'Unbekannt';
                }
                
                let date;
                
                // Handle verschiedene Zeitformate
                if (typeof timestamp === 'number') {
                    // Prüfe ob es Mikrosekunden, Millisekunden oder Sekunden ist
                    // Mikrosekunden sind > 10^12 (z.B. 1.7e12)
                    if (timestamp > 10000000000000) {
                        date = new Date(Math.floor(timestamp / 1000)); // Mikrosekunden zu Millisekunden
                    }
                    // Millisekunden sind 10^12 bis 10^13
                    else if (timestamp > 100000000000) {
                        date = new Date(timestamp); // Bereits Millisekunden
                    }
                    // Sekunden sind kleiner als 10^10 (z.B. 1.7e9 für 2024)
                    else {
                        date = new Date(timestamp * 1000); // Sekunden zu Millisekunden
                    }
                } else if (typeof timestamp === 'string') {
                    date = new Date(timestamp);
                } else {
                    return 'Unbekannt';
                }
                
                // Validiere die Date
                if (isNaN(date.getTime())) {
                    return 'Ungültige Zeit';
                }
                
                const now = new Date();
                const diffMinutes = Math.floor((now - date) / (1000 * 60));
                
                if (diffMinutes < 0) return 'Jetzt';
                if (diffMinutes < 1) return 'Jetzt';
                if (diffMinutes < 60) return `vor ${diffMinutes}m`;
                if (diffMinutes < 1440) {
                    const hours = Math.floor(diffMinutes / 60);
                    return `vor ${hours}h`;
                }
                return date.toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } catch (error) {
                console.error('Fehler beim Formatieren der Zeit:', error, timestamp);
                return 'Unbekannt';
            }
        }

        formatChannel(channel) {
            if (!channel) return '';
            const channelMap = {
                'ShortSlow': 'Short Slow',
                'LongFast': 'Long Fast',
                'Mesh Hessen': 'Mesh Hessen'
            };
            return channelMap[channel] || channel;
        }

        getChannelClass(channel) {
            const classMap = {
                'ShortSlow': 'shortSlow',
                'LongFast': 'longFast',
                'Mesh Hessen': 'meshHessen'
            };
            return classMap[channel] || '';
        }

        sanitizeText(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        showLoading() {
            if (this.messages.length === 0) {
                this.messagesContainer.innerHTML = '<div class="mesh-loading">Lade Nachrichten...</div>';
            }
        }

        showError(message) {
            this.messagesContainer.innerHTML = `<div class="mesh-error">${this.sanitizeText(message)}</div>`;
        }

        updateLastUpdateTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit'
            });
            this.lastUpdateSpan.textContent = `Letzte Aktualisierung: ${timeString}`;
        }

        isScrolledToBottom() {
            if (this.isInitialLoad) return true;
            const threshold = 50;
            const container = this.messagesContainer;
            return container.scrollHeight - container.clientHeight <= container.scrollTop + threshold;
        }

        scrollToBottom() {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }

        handleScroll() {
            if (this.isScrolledToBottom()) {
                this.scrollToBottomBtn.style.display = 'none';
            } else {
                this.scrollToBottomBtn.style.display = 'block';
            }
        }

        removeOldMessages() {
            const messageElements = Array.from(this.messagesContainer.children)
                .filter(el => el.classList.contains('mesh-message'));
            
            if (messageElements.length > this.maxMessages) {
                const toRemove = messageElements.length - this.maxMessages;
                for (let i = 0; i < toRemove; i++) {
                    messageElements[i].remove();
                }
            }
        }

        startAutoRefresh() {
            setInterval(() => {
                this.loadMessages(false, true);
            }, this.refreshInterval);

            setInterval(() => {
                this.updateTimeStamps();
            }, 60000);
        }

        updateTimeStamps() {
            const messageElements = this.messagesContainer.querySelectorAll('.mesh-message');
            
            messageElements.forEach(element => {
                const messageId = parseInt(element.dataset.messageId);
                const message = this.messages.find(m => m.id === messageId);
                
                if (message) {
                    const timeElement = element.querySelector('.mesh-message-time');
                    if (timeElement) {
                        const timestamp = message.import_time_us || message.import_time;
                        timeElement.textContent = this.formatTime(timestamp);
                    }
                }
            });
        }

        // Öffentliche API
        destroy() {
            if (this.widget && this.widget.parentNode) {
                this.widget.parentNode.removeChild(this.widget);
            }
        }

        show() {
            if (this.widget) {
                this.widget.style.display = 'flex';
            }
        }

        hide() {
            if (this.widget) {
                this.widget.style.display = 'none';
            }
        }
    }

    // Globale API bereitstellen
    window.MeshChatWidget = MeshChatWidget;

    // Auto-Initialisierung wenn DOM bereit ist
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (!window.meshChatWidget) {
                window.meshChatWidget = new MeshChatWidget();
            }
        });
    } else {
        // DOM ist bereits bereit
        if (!window.meshChatWidget) {
            window.meshChatWidget = new MeshChatWidget();
        }
    }

})();