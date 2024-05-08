import { getAccessControlById } from "@/actions/access-control/get-access-control";
import EditAccountForm from "./components/form";
import _ from "lodash";

export default async function Page({ params: { _id } }) {
  const accountDetails = _.omit(await getAccessControlById(_id), ["password"]);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Edit Account Information</h1>
      </div>
      <EditAccountForm accountDetails={accountDetails} />
    </div>
  );
}
