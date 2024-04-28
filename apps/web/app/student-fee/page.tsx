import FilterStudentFee from "./component/filter";
import TableStudentFee from "./component/table";

export default async function Page() {


  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Account Fee</h1>
      </div>
      <div>
        <FilterStudentFee />
      </div>
      <TableStudentFee />
    </div>
  );
}
