import { ObjectId } from "mongodb";
import connectDB from "./connectDb";

export async function arrayOfIdToDocument(
  ids: string[],
  collectionName: string
): Promise<any[]> {
  const collection = (await connectDB()).db("yasc").collection(collectionName);

  const objectIds = ids.map((id) => new ObjectId(id));

  const documents = await collection
    .find({ _id: { $in: objectIds } })
    .toArray();

  return documents;
}
