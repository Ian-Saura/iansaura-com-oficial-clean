export const analytics = {
  track: (event: string, data?: any) => {
    // Analytics tracking placeholder
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, data);
    }
  },
  certificateDownloaded: (level: number) => {
    analytics.track('certificate_downloaded', { level });
  },
  progressShared: (platform: string) => {
    analytics.track('progress_shared', { platform });
  },
};