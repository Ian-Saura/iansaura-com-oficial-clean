// Core integration functions for the application

interface EmailParams {
  to: string;
  subject: string;
  body: string;
}

export const SendEmail = async (params: EmailParams): Promise<void> => {
  // In a real application, this would integrate with a service like EmailJS, SendGrid, or a backend API
  // For now, we'll simulate the email sending
  console.log('Sending email:', params);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In development, just log the email
  if (process.env.NODE_ENV === 'development') {
    console.log('Email would be sent:', params);
    return;
  }
  
  // In production, integrate with your email service
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Stripe integration functions
export const createCheckoutSession = async (priceId: string, userEmail?: string) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userEmail,
        successUrl: `${window.location.origin}/?payment=success`,
        cancelUrl: `${window.location.origin}/?canceled=true`,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }
    
    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const verifySubscription = async (sessionId: string) => {
  try {
    const response = await fetch(`/api/verify-subscription?session_id=${sessionId}`);
    
    if (!response.ok) {
      throw new Error('Failed to verify subscription');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying subscription:', error);
    throw error;
  }
}; 