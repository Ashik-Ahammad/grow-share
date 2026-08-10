const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
fs.writeFileSync(envPath, `NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_IMGBB_API_KEY=3b0132c6e27a8d7ce9c95758bd7381e1
NEXT_PUBLIC_IMGBB_UPLOAD_URL=https://api.imgbb.com/1/upload
`);

console.log("Environment variables updated.");

const routes = [
  { dir: 'src/app', name: 'Home', title: 'GrowShare | Social Gardening Community', desc: 'Join the ultimate community for gardeners. Share your plants, buy, sell, exchange, and learn together.' },
  { dir: 'src/app/feed', name: 'Feed', title: 'Social Feed | GrowShare', desc: 'See what other gardeners are growing, share updates, and learn tips from the community.' },
  { dir: 'src/app/marketplace', name: 'Marketplace', title: 'Marketplace | GrowShare', desc: 'Buy, sell, exchange, or giveaway plants and gardening accessories.' },
  { dir: 'src/app/dashboard', name: 'Dashboard', title: 'My Dashboard | GrowShare', desc: 'Manage your gardens, track plants, and view active marketplace listings.' },
  { dir: 'src/app/profile', name: 'Profile', title: 'My Profile | GrowShare', desc: 'Manage your personal GrowShare profile and settings.' },
  { dir: 'src/app/login', name: 'Login', title: 'Log In | GrowShare', desc: 'Log in to your GrowShare account.' },
  { dir: 'src/app/register', name: 'Register', title: 'Sign Up | GrowShare', desc: 'Create a new GrowShare account to start your gardening journey.' },
];

routes.forEach(route => {
  const pagePath = path.join(__dirname, route.dir, 'page.tsx');
  const clientPath = path.join(__dirname, route.dir, 'Client.tsx');
  
  if (fs.existsSync(pagePath)) {
    const content = fs.readFileSync(pagePath, 'utf8');
    
    // Check if it's already a client component
    if (content.includes('"use client"')) {
      // Move to Client.tsx
      fs.writeFileSync(clientPath, content);
      
      // Create new Server Component page.tsx
      const serverContent = `import { Metadata } from "next";
import ${route.name}Client from "./Client";

export const metadata: Metadata = {
  title: "${route.title}",
  description: "${route.desc}",
};

export default function Page() {
  return <${route.name}Client />;
}
`;
      fs.writeFileSync(pagePath, serverContent);
      console.log(`Split SSR/CSR for ${route.name}`);
    }
  }
});
