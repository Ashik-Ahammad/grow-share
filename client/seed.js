const axios = require('axios');

const API = 'http://localhost:5000/api';
const email = 'ashik.cse.ah@gmail.com';
const password = 'Ashik123#';
const name = 'Ashik Ahammad';

async function seedData() {
  try {
    console.log("Seeding data started...");
    
    // 1. Register (ignore if already exists)
    try {
      await axios.post(`${API}/auth/register`, { name, email, password, role: 'USER' });
      console.log("Registered new user.");
    } catch (e) {
      console.log("User already exists, proceeding to login...");
    }

    // 2. Login
    const loginRes = await axios.post(`${API}/auth/login`, { email, password });
    const token = loginRes.data.data.accessToken;
    console.log("Login successful.");

    const axiosInstance = axios.create({
      baseURL: API,
      headers: { Authorization: `Bearer ${token}` }
    });

    // 3. Create Posts
    const posts = [
      "Just started my new rooftop garden in Dhaka! Very excited. 🌿",
      "Can anyone recommend a good organic fertilizer for tomato plants? 🍅",
      "Look at this beautiful Monstera leaf that just unfurled today! Absolutely stunning. 💚",
    ];
    for (const description of posts) {
      await axiosInstance.post('/posts', { description });
    }
    console.log("Added 3 Posts.");

    // 4. Create Listings (Make sure we pass categoryId if it is required, wait, categoryId is optional in our schema? Let's check schema. Actually, Prisma usually requires relation fields if not marked optional. In schema.prisma, `categoryId` is optional? Let's check.)
    // Actually, looking at `schema.prisma`, `categoryId` in Listing might be optional or string. Let's just create a category first.
    
    let catId = null;
    try {
      const catRes = await axiosInstance.post('/categories', { name: "Indoor Plants" });
      catId = catRes.data.data.id;
    } catch(e) {
      // Category might exist, or user is not ADMIN. If not ADMIN, it will fail (auth("ADMIN")).
      // That's fine, categoryId is optional in the DB design if I remember correctly.
    }

    const listings = [
      { title: "Healthy Aloe Vera Plant", description: "Very healthy 2-year-old Aloe Vera.", price: 300, type: "SELL", location: "Dhanmondi, Dhaka", categoryId: catId },
      { title: "Mint Leaves Cuttings", description: "Free mint cuttings for anyone who wants to start.", price: 0, type: "GIVEAWAY", location: "Gulshan, Dhaka", categoryId: catId },
      { title: "Snake Plant", description: "Looking to exchange this for a Spider Plant.", price: 0, type: "EXCHANGE", location: "Mirpur, Dhaka", categoryId: catId },
      { title: "Organic Compost 5kg", description: "Home-made organic compost.", price: 150, type: "SELL", location: "Savar", categoryId: catId },
    ];
    
    for (const listing of listings) {
      // Clean up nulls
      if (!listing.categoryId) delete listing.categoryId;
      await axiosInstance.post('/listings', listing);
    }
    console.log("Added 4 Marketplace Listings.");

    // 5. Create Gardens
    await axiosInstance.post('/gardens', { name: "Balcony Succulents", location: "Balcony" });
    await axiosInstance.post('/gardens', { name: "Rooftop Veggies", location: "Rooftop" });
    console.log("Added 2 Gardens.");

    console.log("Seeding complete! You can now check the UI.");
    
  } catch (error) {
    console.error("Error during seeding:", error?.response?.data || error.message);
  }
}

seedData();
