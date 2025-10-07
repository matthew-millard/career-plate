import prisma from "~/lib/prisma";

async function seedDb() {
  console.log("🌱 Seeding...");
  console.time("🧹 Cleaned up the database...");
  await prisma.user.deleteMany({});
  console.timeEnd("🧹 Cleaned up the database...");
  console.log("Done.");
}

seedDb();
