import prisma from "~/lib/prisma";

export async function getAllGuests() {
  const allGuests = await prisma.guest.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return allGuests;
}

export async function addGuest(formData: FormData) {
  const firstName = String(formData.get("firstName"));
  const lastName = String(formData.get("lastName"));

  try {
    await prisma.guest.create({
      data: {
        firstName,
        lastName,
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteGuest(formData: FormData) {
  const id = String(formData.get("id"));

  try {
    // throw Error("something went wrong while deleting");
    await prisma.guest.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    return { success: false };
  }
}
