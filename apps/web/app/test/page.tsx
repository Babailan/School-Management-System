import { Button } from "@/components/ui/button";

export default function Test() {
  const clerr = async () => {
    "use server";
    // Create a transporter object
  };
  return (
    <div className="p-10">
      <form action={clerr}>
        <Button variant="secondary" type="submit">
          Do something
        </Button>
      </form>
    </div>
  );
}
