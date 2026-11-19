# CampusSave – Frontend React

## Installation
```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

Demo account: `sabrine@essect.tn` / `123456`

## Structure
- `src/pages` : Home, Offers (search + filters), OfferDetails, Login, Register, Dashboard, Profile
- `src/components` : Navbar, Footer, OfferCard, DashboardLayout, AuthShell…
- `src/context/AuthContext.jsx` : simulated authentication (localStorage) → to be replaced by Firebase Auth
- `src/data/offers.js` : demo data → to be replaced by the Node/Express API

## To connect next
1. Firebase Authentication in `AuthContext.jsx`
2. `GET /api/offers`, `POST /api/reservations` in the Express backend
3. Real photos: add `image: '/images/xxx.jpg'` to the offers (`public/images` folder)
4. Konnect payment + a real QR code (`qrcode.react`) instead of `QrPlaceholder`
