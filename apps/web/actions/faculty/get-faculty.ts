import connectDB from "@/lib/helpers/connectDb";

/**
 * Retrieves all faculty members from the "user_account" collection in the "yasc" database.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of faculty member objects.
 */
export async function GetAllFacultyActions() {
  const collection = (await connectDB()).collection("user_account");
  const data = await collection
    .find(
      {
        roles: { $in: ["faculty"] },
      },
      { projection: { password: 0 } }
    )
    .toArray();
  return data;
}
