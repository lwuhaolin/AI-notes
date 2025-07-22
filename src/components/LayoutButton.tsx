"use client";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LayOutAction } from "@/actions/users";

function LayoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLayOut = async () => {
    console.log("Layout button clicked");
    setLoading(true);
    const result = await LayOutAction();
    let errorMessage: string | null = null;

    if (typeof result === "string") {
      errorMessage = result;
    } else if (
      result &&
      typeof result === "object" &&
      "errorMessage" in result
    ) {
      errorMessage = result.errorMessage;
    }
    if (!errorMessage) {
      //   toast.success("Success", { description: "Event has been created." });
      console.log("Layout successful");
      router.push("/");
    } else {
      //   toast.error(errorMessage, {
      //     description: "Layout button failed",
      //   });
      console.error("Layout failed:", errorMessage);
    }
    setLoading(false);
  };
  return (
    <Button
      className="w-24"
      onClick={handleLayOut}
      disabled={loading}
      variant="outline"
    >
      {loading ? <Loader2 className="animate-spin" /> : "Lay Out"}
    </Button>
  );
}

export default LayoutButton;
