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
            height: 500px;
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
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%);
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
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
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
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
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
            background: linear-gradient(135deg, #2c3e50, #34495e);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.2);
            padding: 10px 16px;
            border-radius: 25px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(44, 62, 80, 0.3);
            z-index: 10001;
            transition: all 0.3s ease;
            opacity: 0.95;
            backdrop-filter: blur(10px);
            letter-spacing: 0.3px;
            display: none;
        }

        .mesh-scroll-to-bottom:hover {
            background: linear-gradient(135deg, #34495e, #2c3e50);
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(44, 62, 80, 0.4);
            border-color: rgba(255, 255, 255, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .mesh-chat-widget {
                width: calc(100vw - 40px);
                height: 450px;
                right: 20px;
                left: 20px;
                border-width: 2px;
            }
            
            .mesh-scroll-to-bottom {
                bottom: 90px;
                right: 30px;
            }
        }

        @media (max-width: 480px) {
            .mesh-chat-widget {
                bottom: 0;
                right: 0;
                left: 0;
                width: 100vw;
                height: 65vh;
                border-radius: 16px 16px 0 0;
                border-bottom: none;
                border-width: 2px 0 0 0;
            }
            
            .mesh-chat-header {
                padding: 16px 20px;
                border-radius: 16px 16px 0 0;
            }
            
            .mesh-chat-header h3 {
                font-size: 16px;
            }
            
            .mesh-message-sender {
                font-size: 14px;
            }
            
            .mesh-message-content {
                font-size: 14px;
            }
            
            .mesh-scroll-to-bottom {
                bottom: 100px;
                right: 20px;
                padding: 8px 12px;
                font-size: 11px;
            }
        }
    `;

    // Widget-Klasse
    class MeshChatWidget {
        constructor(options = {}) {
            // Konfiguration mit Defaults
            this.apiUrl = options.apiUrl || 'https://meshview.lsinfra.de/api/chat';
            this.refreshInterval = options.refreshInterval || 30000;
            this.maxMessages = options.maxMessages || 50;
            this.title = options.title || 'MESH HESSEN Chat';
            
            // Interne Variablen
            this.messages = [];
            this.isMinimized = false;
            this.isInitialLoad = true;
            this.lastUpdateTime = null;
            
            // Widget initialisieren
            this.injectStyles();
            this.createWidget();
            this.bindEvents();
            this.loadMessages();
            this.startAutoRefresh();
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
                        <button class="mesh-minimize-btn" title="Minimieren/Maximieren">−</button>
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
        }

        async loadMessages(forceRefresh = false) {
            try {
                // Nur bei erstem Laden oder Force-Refresh loading anzeigen
                if (this.messages.length === 0) {
                    this.showLoading();
                }
                
                let url = `${this.apiUrl}?limit=${this.maxMessages}`;
                const response = await fetch(url, {
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
                    } else {
                        const existingIds = new Set(this.messages.map(m => m.id));
                        const newMessages = data.packets.filter(packet => !existingIds.has(packet.id));
                        
                        if (newMessages.length > 0) {
                            this.messages = [...this.messages, ...newMessages];
                            this.messages.sort((a, b) => new Date(b.import_time) - new Date(a.import_time));
                            this.messages = this.messages.slice(0, this.maxMessages);
                            this.addNewMessages(newMessages);
                        } else {
                            // Prüfe ob DOM leer ist
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

            const sortedMessages = [...this.messages].sort((a, b) => 
                new Date(a.import_time) - new Date(b.import_time)
            );

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
            
            const sortedNewMessages = [...newMessages].sort((a, b) => 
                new Date(a.import_time) - new Date(b.import_time)
            );

            sortedNewMessages.forEach(message => {
                const messageElement = this.createMessageElement(message);
                this.messagesContainer.appendChild(messageElement);
            });

            this.removeOldMessages();

            if (wasScrolledToBottom) {
                setTimeout(() => this.scrollToBottom(), 100);
            }
        }

        createMessageElement(message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'mesh-message';
            messageDiv.dataset.messageId = message.id;
            
            if (message.reply_id) {
                messageDiv.classList.add('reply');
            }

            const time = this.formatTime(message.import_time);
            const sender = this.sanitizeText(message.long_name || 'Unbekannt');
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
                const date = new Date(timestamp);
                const now = new Date();
                const diffMinutes = Math.floor((now - date) / (1000 * 60));
                
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
                if (!this.isMinimized) {
                    this.loadMessages();
                }
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
                        timeElement.textContent = this.formatTime(message.import_time);
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