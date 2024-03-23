import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Counter from "./Counter";

export default function App() {
  const queryClient = useQueryClient();

  // Query 
  const { data: queryCount } = useQuery({
    queryKey: ["count"],
    queryFn: () => 0,
  });

  // Increment Mutation
  const { mutate } = useMutation({
    mutationFn: () => {
      // return setCount((prevCount) => prevCount + 1);
      return true
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["count"] });
       queryClient.setQueryData(["count"], (oldData) => {
         return oldData + 1; // Update based on previous value
       });
    },
  });

  return (
    <div>
      <Counter />
      <p>this is main componant</p>
      <h1>Counter: {queryCount}</h1>
      <button onClick={() => mutate()}>Increment</button>
      {/* Add a decrement button */}
    </div>
  );
}
