import { prisma } from "./lib/prisma.js";

async function setup() {
  console.log("Setting up DB...");
  const cat = await prisma.category.create({ data: { name: "Indoor Plants", icon: "🌿" } }).catch(async () => await prisma.category.findFirst());
  console.log("Cat ID:", cat?.id);
  
  await prisma.user.updateMany({ where: { email: "ashik.cse.ah@gmail.com" }, data: { role: "ADMIN" } });
  console.log("User updated.");
}

setup();
