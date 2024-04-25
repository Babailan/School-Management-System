import { getTuitionByIdAction } from "@/actions/tuition/get-tuition";
import EditTuitionForm from "./component/edit-tuition-form";

export default async function Page({ params: { _id } }) {
  const data = await getTuitionByIdAction(_id);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Edit Tuition Fee</h1>
        <p className="text-muted-foreground">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <EditTuitionForm data={data}/>
    </div>
  );
}
