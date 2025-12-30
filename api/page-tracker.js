/**
 * Page Tracker for Ian Saura Data Engineering Hub
 * Tracks page views, user interactions, and analytics
 */

class PageTracker {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.apiUrl = '/api/track.php';
        this.userId = null;
        
        // Initialize tracking
        this.init();
    }
    
    init() {
        // Track page view on load
        this.trackPageView();
        
        // Track page view duration on beforeunload
        window.addEventListener('beforeunload', () => {
            this.trackPageDuration();
        });
        
        // Track clicks on important elements
        this.trackClicks();
        
        // Track form submissions
        this.trackForms();
        
        // Track downloads
        this.trackDownloads();
        
        // Track scroll depth
        this.trackScrollDepth();
    }
    
    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    async trackEvent(eventType, eventData = {}) {
        const data = {
            event_type: eventType,
            page_url: window.location.pathname,
            page_title: document.title,
            referrer: document.referrer,
            session_id: this.sessionId,
            user_id: this.userId,
            timestamp: Date.now(),
            ...eventData
        };
        
        try {
            await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                keepalive: true
            });
        } catch (error) {
            console.warn('Tracking failed:', error);
        }
    }
    
    trackPageView() {
        this.trackEvent('page_view', {
            viewport_width: window.innerWidth,
            viewport_height: window.innerHeight,
            screen_width: screen.width,
            screen_height: screen.height,
            user_agent: navigator.userAgent,
            language: navigator.language
        });
    }
    
    trackPageDuration() {
        const duration = Math.round((Date.now() - this.startTime) / 1000);
        this.trackEvent('page_duration', {
            duration_seconds: duration
        });
    }
    
    trackClicks() {
        document.addEventListener('click', (event) => {
            const element = event.target;
            const tagName = element.tagName.toLowerCase();
            
            // Track important clicks
            if (tagName === 'a' || tagName === 'button' || element.closest('button')) {
                const text = element.textContent?.trim() || element.alt || element.title;
                const href = element.href || element.closest('a')?.href;
                
                this.trackEvent('click', {
                    element_type: tagName,
                    element_text: text,
                    element_href: href,
                    element_class: element.className,
                    element_id: element.id
                });
            }
        });
    }
    
    trackForms() {
        document.addEventListener('submit', (event) => {
            const form = event.target;
            if (form.tagName.toLowerCase() === 'form') {
                const formData = new FormData(form);
                const data = {};
                
                // Don't send sensitive data, just form structure
                for (let [key, value] of formData.entries()) {
                    // Only track field names and types, not values
                    data[key] = form.querySelector(`[name="${key}"]`)?.type || 'text';
                }
                
                this.trackEvent('form_submit', {
                    form_id: form.id,
                    form_class: form.className,
                    form_action: form.action,
                    form_fields: data
                });
            }
        });
    }
    
    trackDownloads() {
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (link && link.href) {
                const href = link.href;
                const downloadExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.rar'];
                
                if (downloadExtensions.some(ext => href.toLowerCase().includes(ext))) {
                    this.trackEvent('download', {
                        file_url: href,
                        file_name: href.split('/').pop(),
                        link_text: link.textContent?.trim()
                    });
                }
            }
        });
    }
    
    trackScrollDepth() {
        let maxScroll = 0;
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollPercent = Math.round(
                    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
                );
                
                if (scrollPercent > maxScroll) {
                    maxScroll = scrollPercent;
                    
                    // Track significant scroll milestones
                    if ([25, 50, 75, 100].includes(scrollPercent)) {
                        this.trackEvent('scroll_depth', {
                            scroll_percent: scrollPercent
                        });
                    }
                }
            }, 100);
        });
    }
    
    setUserId(userId) {
        this.userId = userId;
    }
    
    trackCustomEvent(eventName, eventData = {}) {
        this.trackEvent(eventName, eventData);
    }
}

// Initialize tracker when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.pageTracker = new PageTracker();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageTracker;
} 