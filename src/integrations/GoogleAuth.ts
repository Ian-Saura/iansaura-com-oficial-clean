import { GOOGLE_CONFIG } from '../config/google';
import { logger } from '../utils/logger';

// Google OAuth Configuration
const GOOGLE_CLIENT_ID = GOOGLE_CONFIG.CLIENT_ID;

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
}

declare global {
  interface Window {
    google: any;
  }
}

export class GoogleAuth {
  private static instance: GoogleAuth;
  private initialized: boolean = false;
  private resolveCallback: ((user: GoogleUser) => void) | null = null;
  private rejectCallback: ((error: Error) => void) | null = null;

  private constructor() {}

  static getInstance(): GoogleAuth {
    if (!GoogleAuth.instance) {
      GoogleAuth.instance = new GoogleAuth();
    }
    return GoogleAuth.instance;
  }

  // Initialize Google Identity Services
  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.initialized && window.google) {
        resolve();
        return;
      }

      // Check if script is already loaded
      if (window.google && window.google.accounts) {
        this.initializeGoogleAuth();
        resolve();
        return;
      }

      // Load Google Identity Services script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        try {
          // Wait a bit for the API to be ready
          setTimeout(() => {
            this.initializeGoogleAuth();
            resolve();
          }, 100);
        } catch (error) {
          reject(error);
        }
      };
      script.onerror = () => {
        reject(new Error('Failed to load Google Identity Services'));
      };
      document.head.appendChild(script);
    });
  }

  private initializeGoogleAuth(): void {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: this.handleCredentialResponse.bind(this),
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        this.initialized = true;
      } catch (error) {
        logger.error('Error initializing Google Auth:', error);
        throw new Error('Failed to initialize Google Authentication');
      }
    } else {
      throw new Error('Google Identity Services not available');
    }
  }

  private handleCredentialResponse(response: any): void {
    try {
      const user = this.parseJWTResponse(response);
      if (this.resolveCallback) {
        this.resolveCallback(user);
        this.resolveCallback = null;
        this.rejectCallback = null;
      }
    } catch (error) {
      logger.error('Error handling credential response:', error);
      if (this.rejectCallback) {
        this.rejectCallback(new Error('Failed to process Google authentication'));
        this.resolveCallback = null;
        this.rejectCallback = null;
      }
    }
  }

  // Sign in with Google using OAuth redirect
  async signIn(needsUpgrade: boolean = false): Promise<GoogleUser> {
    try {
      await this.initialize();
      
      // Use OAuth redirect flow - MUST match Google Cloud Console exactly
      // Using https://iansaura.com/login (sin www) as the redirect URI
      const redirectUri = 'https://iansaura.com/login';
      const state = needsUpgrade ? 'upgrade' : 'login';
      const scope = 'openid profile email';
      
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${GOOGLE_CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=${encodeURIComponent(scope)}&` +
        `response_type=code&` +
        `state=${state}`;

      // Redirect to Google OAuth
      window.location.href = authUrl;
      
      // This promise will never resolve as we're redirecting
      return new Promise(() => {});
    } catch (error) {
      logger.error('Google sign-in error:', error);
      throw new Error('Error al iniciar sesión con Google. Inténtalo de nuevo.');
    }
  }

  private renderSignInButton(): void {
    // Create a temporary container for the button
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'google-signin-button';
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.top = '50%';
    buttonContainer.style.left = '50%';
    buttonContainer.style.transform = 'translate(-50%, -50%)';
    buttonContainer.style.zIndex = '10000';
    buttonContainer.style.backgroundColor = 'white';
    buttonContainer.style.padding = '20px';
    buttonContainer.style.borderRadius = '8px';
    buttonContainer.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    
    document.body.appendChild(buttonContainer);

    // Render Google Sign-In button
    window.google.accounts.id.renderButton(buttonContainer, {
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular',
      logo_alignment: 'left',
    });

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '10px';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '20px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = () => {
      document.body.removeChild(buttonContainer);
      if (this.rejectCallback) {
        this.rejectCallback(new Error('Google sign-in cancelled'));
        this.resolveCallback = null;
        this.rejectCallback = null;
      }
    };
    buttonContainer.appendChild(closeButton);
  }

  private parseJWTResponse(response: any): GoogleUser {
    try {
      // Decode JWT token
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      const user: GoogleUser = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        given_name: payload.given_name || payload.name.split(' ')[0],
        family_name: payload.family_name || payload.name.split(' ').slice(1).join(' ')
      };

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Clean up button if it exists
      const buttonContainer = document.getElementById('google-signin-button');
      if (buttonContainer) {
        document.body.removeChild(buttonContainer);
      }
      
      return user;
    } catch (error) {
      logger.error('Error parsing JWT response:', error);
      throw new Error('Failed to parse Google authentication response');
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.disableAutoSelect();
      }
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    } catch (error) {
      logger.error('Google sign-out error:', error);
      throw error;
    }
  }

  // Check if user is signed in
  isSignedIn(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  // Get current user
  getCurrentUser(): GoogleUser | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

export default GoogleAuth; 