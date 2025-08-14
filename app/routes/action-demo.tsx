// import { ActionFunctionArgs } from "@remix-run/node";
// import prisma from "~/lib/prisma";

// export async function action({ request }: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const id = String(formData.get("id"));

//   try {
//     await prisma.guest.delete({
//       where: {
//         id,
//       },
//     });

//     return { success: true };
//   } catch (error) {
//     return { success: false, error: { message: error.message } };
//   }
// }
