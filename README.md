# Ian Saura - Data Engineering Hub

A professional website and subscription platform for Ian Saura's Data Engineering educational content and mentoring services.

## 🎯 Features

- **Responsive Design**: Optimized for all devices
- **Modern UI**: Clean, professional design with smooth animations
- **Authentication**: Google OAuth integration + custom auth
- **Payment Integration**: Stripe checkout for subscriptions
- **Contact System**: Form with email notifications
- **Analytics**: Page tracking and user behavior analytics
- **Waitlist System**: Collect interested users before launch
- **Members Area**: *Coming soon after waitlist phase* - Exclusive content with videos, resources, and community features

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Payments**: Stripe
- **Build Tool**: Create React App

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ian-saura-data-engineering-hub.git
cd ian-saura-data-engineering-hub
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update your `.env` file with your Stripe keys and other configurations.

5. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`.

## 🔧 Configuration

### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your publishable key from the Stripe dashboard
3. Create a monthly subscription product ($10/month)
4. Update your `.env` file with your Stripe keys

### Email Configuration

The contact form uses a simulated email service. For production:

1. Set up EmailJS, SendGrid, or similar service
2. Update the `SendEmail` function in `src/integrations/Core.ts`
3. Add your email service credentials to `.env`

## 📱 Usage

*Note: The full members area with exclusive content will be available after the waitlist phase is complete.*

### Production Authentication

For production, integrate with your preferred authentication service:

1. Firebase Authentication
2. Auth0
3. AWS Cognito
4. Custom backend API

## 🎨 Customization

### Content

- Update personal information in `src/pages/Home.tsx`
- Modify videos and resources in `src/pages/Members.tsx`
- Change testimonials and pricing in the Home page
- Update social media links throughout the application

### Styling

- Modify Tailwind configuration in `tailwind.config.js`
- Update color scheme and typography
- Customize animations and transitions

### Features

- Add new sections to the landing page
- Implement additional member benefits
- Add more authentication providers
- Integrate with learning management systems

## 📄 Pages Structure

- `/` - Landing page with hero, about, services, and contact
- `/auth` - Login/signup with subscription flow
- `/waitlist` - Waitlist signup for early access
- `/members` - *Coming soon* - Exclusive content for subscribed users (videos, resources, community)

## 🔒 Authentication Flow

1. User visits landing page
2. Clicks subscription CTA
3. Redirected to auth page if not logged in
4. After login/signup, can join waitlist or proceed with payment
5. *Members area access will be enabled after waitlist phase*

## 🚀 Deployment

### Netlify/Vercel

1. Build the project:
```bash
npm run build
```

2. Deploy the `build` folder to your preferred hosting service

### Environment Variables

Make sure to set these in your hosting platform:
- `REACT_APP_STRIPE_PUBLISHABLE_KEY`
- Other API keys and configuration variables

## 📊 Analytics & SEO

- Google Analytics integration ready
- Meta tags for social media sharing
- Structured data for better SEO
- Sitemap and robots.txt included

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Ian Saura.

## 📞 Support

For support, email info@iansaura.com or connect on:
- [LinkedIn](https://www.linkedin.com/in/ian-saura/)
- [Instagram](https://www.instagram.com/iansaura/)
- [TikTok](https://www.tiktok.com/@iansaura)

---

**Built with ❤️ for the Data Engineering community** 