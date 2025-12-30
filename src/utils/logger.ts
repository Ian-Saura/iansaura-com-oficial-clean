/**
 * Production-safe logger utility
 * Only logs in development mode
 */

const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: unknown[]) => {
    if (isDev) {
      console.log(...args);
    }
  },
  
  error: (...args: unknown[]) => {
    if (isDev) {
      console.error(...args);
    }
    // In production, you could send to error tracking service here
  },
  
  warn: (...args: unknown[]) => {
    if (isDev) {
      console.warn(...args);
    }
  },
  
  debug: (...args: unknown[]) => {
    if (isDev) {
      console.debug(...args);
    }
  },
  
  info: (...args: unknown[]) => {
    if (isDev) {
      console.info(...args);
    }
  },
};

export default logger;



