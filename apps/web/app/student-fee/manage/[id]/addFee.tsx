import React from "react";
import { Button, Dialog, Flex, Text } from "@radix-ui/themes"; // Replace with your actual component library imports
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import PesoInput from "@/components/input/pesoinput";
import { addStudentFeeAction } from "@/actions/student-fee/add-student-fee";
import { useQueryClient } from "@tanstack/react-query";

export default function ({ id, year }) {
  const [amount, setAmount] = React.useState(0);
  const queryClient = useQueryClient();

  const handleDeposit = async () => {
    const result = await addStudentFeeAction(id, year, amount);
    if (result.success) {
      queryClient.refetchQueries();
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="2" variant="classic">
          <PaperPlaneIcon />
          Deposit Money
        </Button>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 400 }}>
        <Dialog.Title>Deposit Money</Dialog.Title>
        <Dialog.Description size={"2"}>
          Deposit money to the student
        </Dialog.Description>
        <Flex direction="column" my="5">
          <Text size="2">Amount</Text>
          <PesoInput
            type="number"
            placeholder="Enter amount"
            className="border-2 border-gray-200 p-2"
            name="PesoInput"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </Flex>
        <Flex gap="4" justify="end">
          <Dialog.Close>
            <Button variant="surface">Cancel</Button>
          </Dialog.Close>
          <Dialog.Trigger>
            <Button variant="surface" onClick={handleDeposit}>
              Deposit
            </Button>
          </Dialog.Trigger>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
