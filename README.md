# Dartford Cricket Club - Sponsorship Website

A modern, responsive website showcasing sponsorship opportunities for Dartford Cricket Club's historic 300th anniversary celebration in 2026-2027.

## 🏏 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Countdown Timer** - Live countdown to the 300th anniversary
- **Interactive Package Display** - All sponsorship packages from the PDF
- **Contact Form** - Easy way for prospects to get in touch
- **Modern UI** - Clean, professional design with cricket theme
- **Fast Loading** - Optimized for performance
- **SEO Friendly** - Proper meta tags and structure

## 🚀 Deployment Options

### Option 1: GitHub Pages (Recommended - 100% Free)

1. **Create a GitHub Repository**
   ```bash
   cd dcc-sponsorship-website
   git init
   git add .
   git commit -m "Initial commit: DCC sponsorship website"
   ```

2. **Push to GitHub**
   ```bash
   # Create a new repository on GitHub first (e.g., dcc-sponsorship)
   git remote add origin https://github.com/YOUR_USERNAME/dcc-sponsorship.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/dcc-sponsorship/`

4. **Custom Domain (Optional)**
   - In GitHub Pages settings, add your custom domain
   - Update DNS records with your domain provider
   - GitHub provides free SSL certificate

### Option 2: Netlify (Free with Drag & Drop)

1. Go to [netlify.com](https://www.netlify.com/)
2. Sign up for free
3. Drag and drop the `dcc-sponsorship-website` folder
4. Your site is live instantly!
5. Custom domain and SSL included free

### Option 3: Vercel (Free)

1. Go to [vercel.com](https://vercel.com/)
2. Sign up with GitHub
3. Import your repository
4. Deploy with one click
5. Free SSL and custom domain support

### Option 4: Cloudflare Pages (Free)

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com/)
2. Connect your GitHub account
3. Select your repository
4. Deploy automatically
5. Free unlimited bandwidth

## 📧 Contact Form Setup

The contact form currently logs submissions to the console. To make it functional, integrate with one of these free services:

### Formspree (Recommended)
1. Sign up at [formspree.io](https://formspree.io/)
2. Create a new form
3. Get your form endpoint
4. Update `script.js` line 95 with your endpoint:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
       method: 'POST',
       body: formData,
       headers: { 'Accept': 'application/json' }
   });
   ```

### EmailJS
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Set up email service
3. Follow their integration guide
4. Free tier: 200 emails/month

### Web3Forms
1. Sign up at [web3forms.com](https://web3forms.com/)
2. Get your access key
3. Add to form as hidden input
4. Free tier: 250 submissions/month

## 🎨 Customization

### Update Contact Information
Edit `index.html` lines 180-200 to update:
- Email address
- Phone number
- Physical address
- Social media links

### Change Colors
Edit `styles.css` lines 10-17 to customize the color scheme:
```css
:root {
    --primary-color: #1a472a;    /* Dark green */
    --secondary-color: #2d7a4a;  /* Medium green */
    --accent-color: #ffd700;     /* Gold */
}
```

### Update Anniversary Date
Edit `script.js` line 3 to change the countdown target:
```javascript
const targetDate = new Date('2027-01-01T00:00:00').getTime();
```

## 📱 Testing Locally

Simply open `index.html` in your web browser, or use a local server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js (if you have npx)
npx serve

# Then visit: http://localhost:8000
```

## 📊 Analytics (Optional)

Add Google Analytics or Plausible Analytics to track visitors:

1. **Google Analytics** (Free)
   - Create account at [analytics.google.com](https://analytics.google.com/)
   - Add tracking code to `index.html` before `</head>`

2. **Plausible** (Privacy-friendly, paid)
   - More privacy-focused alternative
   - Simple script tag integration

## 🔒 SSL Certificate

All recommended hosting options provide free SSL certificates automatically:
- GitHub Pages: Free SSL via Let's Encrypt
- Netlify: Free SSL included
- Vercel: Free SSL included
- Cloudflare Pages: Free SSL included

## 💰 Cost Breakdown

**Total Cost: £0/year** ✅

- Hosting: Free (GitHub Pages/Netlify/Vercel)
- SSL Certificate: Free (included)
- Contact Form: Free (up to 50-250 submissions/month)
- Custom Domain: £10-15/year (optional)
- Bandwidth: Unlimited (free)

## 📞 Support

For questions or updates, contact:
- Email: sponsorship@dartfordcc.co.uk
- Website: https://www.dartfordcc.co.uk

## 📝 License

© 2026 Dartford Cricket Club. All rights reserved.
