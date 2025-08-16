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
  const id = String(formData.get("id"));
  const firstName = String(formData.get("firstName"));
  const lastName = String(formData.get("lastName"));

  try {
    await prisma.guest.create({
      data: {
        id,
        firstName,
        lastName,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error };
    }
  }
}

export async function deleteGuest(formData: FormData) {
  const id = String(formData.get("id"));

  try {
    // for demonstration purposes only - has a 50% chance of throwing an error
    if (Math.random() < 0.5) {
      throw Error("Something went wrong while deleting");
    }
    await prisma.guest.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: { message: error.message } };
    }

    return { success: false, error: { message: "Unexpected error occurred" } };
  }
}
