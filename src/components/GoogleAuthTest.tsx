import React, { useState } from 'react';
import GoogleAuth, { GoogleUser } from '../integrations/GoogleAuth';
import { Button } from './ui/button';

export default function GoogleAuthTest() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const googleAuth = GoogleAuth.getInstance();
      const googleUser = await googleAuth.signIn();
      setUser(googleUser);
      console.log('Google user signed in:', googleUser);
    } catch (error) {
      console.error('Google sign-in error:', error);
      alert('Error al iniciar sesión con Google');
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    try {
      const googleAuth = GoogleAuth.getInstance();
      await googleAuth.signOut();
      setUser(null);
      console.log('User signed out');
    } catch (error) {
      console.error('Google sign-out error:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Google Auth Test</h2>
      
      {user ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img 
              src={user.picture} 
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-3 rounded text-sm">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Given Name:</strong> {user.given_name}</p>
            <p><strong>Family Name:</strong> {user.family_name}</p>
          </div>
          
          <Button onClick={handleSignOut} variant="outline" className="w-full">
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600">Click the button below to test Google authentication:</p>
          <Button 
            onClick={handleSignIn} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </Button>
        </div>
      )}
    </div>
  );
} 