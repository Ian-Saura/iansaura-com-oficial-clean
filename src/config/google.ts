// Google OAuth Configuration
// El Client ID debe configurarse en .env como REACT_APP_GOOGLE_CLIENT_ID
export const GOOGLE_CONFIG = {
  CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
  SCOPES: ['profile', 'email'],
  REDIRECT_URIS: [
    'http://localhost:3000/login',
    'https://www.iansaura.com/login',
    'https://iansaura.com/login'
  ]
};
