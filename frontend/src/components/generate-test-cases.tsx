"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "./ui/loader";

export function GenerateTestCases({ api_id }: { api_id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function generateCases(apiId: string) {
    try {
      setLoading(true);
      const response = await fetch(`/api/generate/cases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ api_id: apiId }),
      });

      const data = await response.json();
      toast.success("Test cases generated successfully!");
      router.push(`/dashboard/all-apis/${apiId}`);
    } catch (err) {
      console.log(err);
      toast.error("Failed to generate cases!");
      throw new Error("Failed to generate cases!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="default"
      onClick={() => {
        generateCases(api_id);
      }}
      className="w-42"
    >
      {loading ? <Loader size={2} /> : "Generate Test Cases"}
    </Button>
  );
}
