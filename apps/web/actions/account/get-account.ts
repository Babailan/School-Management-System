"use server";

import stringToRegexSearch from "@/lib/helpers/stringToRegexSearch";
import type { Filter, Document } from "mongodb";
import { connectDB } from "@/lib/helpers/connectDb";
import { getAuth } from "@/lib/crypto/getAuth";
import { ObjectId } from "mongodb";
import _ from "lodash";
import { comparePassword, hashPassword } from "@/lib/crypto/password";

export async function getAccountInformationAction() {
  const session = await getAuth();

  if (session) {
    const collection = (await connectDB()).collection("user-account");
    return JSON.parse(
      JSON.stringify(
        await collection.findOne({ _id: new ObjectId(session._id) })
      )
    );
  }
  return null;
}

export async function getAccountSearchAction(
  query: string,
  page: number,
  limit: number,
  filter: Filter<Document> = {}
) {
  const skip = (page - 1) * limit;
  const collection = (await connectDB()).collection("user-account");
  query = query.toLowerCase().trim();

  if (query) {
    filter = _.merge(filter, {
      document_name: stringToRegexSearch(query, true),
    });
  }

  const filterCursor = collection.find(filter);
  const totalCount = await filterCursor.count();
  const totalPages = Math.ceil(totalCount / limit);

  const result = await filterCursor.skip(skip).limit(limit).toArray();

  return JSON.parse(
    JSON.stringify({
      results: result,
      totalPages,
    })
  );
}

export async function getAccountsByFilter(filter) {
  const collection = (await connectDB()).collection("user-account");
  return JSON.parse(JSON.stringify(await collection.find({ filter })));
}

export async function getValidatePIN(pin: string) {
  const session = await getAuth();

  const account = await (await connectDB())
    .collection("user-account")
    .findOne({ _id: new ObjectId(session._id) });


  if (_.has(account, "pin")) {
    if (await comparePassword(pin, account?.pin)) {
      return { success: true, message: "Successfully Validate PIN" };
    } else {
      return {
        success: false,
        message: "Invalid PIN",
      };
    }
  } else {
    return {
      success: false,
      message: "This account doesn't have MPIN.",
    };
  }
}
export async function getCheckExistingPIN() {
  const session = await getAuth();
  const collection = (await connectDB()).collection("user-account");

  if (session) {
    const account_data = await collection.findOne({
      _id: new ObjectId(session._id),
    });

    return _.has(account_data, "pin");
  } else {
    return false;
  }
}
