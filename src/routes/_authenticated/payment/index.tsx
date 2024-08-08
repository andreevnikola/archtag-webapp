import { Button } from "@/components/ui/button";
import { Holder } from "@/components/ui/holder";
import { useUser } from "@/lib/hooks/useUser";
import { Request } from "@/lib/requestr";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const packages = [
  { name: "Basic Package", description: "Description for Basic Package", lookupKey: "test_plan_price_1" },
  { name: "Standard Package", description: "Description for Standard Package", lookupKey: "standard_package" },
  { name: "Premium Package", description: "Description for Premium Package", lookupKey: "premium_package" }
];

export const Route = createFileRoute("/_authenticated/payment/")({
  component: PaymentPage,
});

function PaymentPage() {
  const navigate = useNavigate();

  const { isLoading, send, error } = Request.builder()
    .url("/payment/create-checkout-session")
    .method("POST")
    .useNotificatonErrorHandler()
    .authenticatedRequest()
    .useRequestr();

  const handleBuyPackage = async (lookupKey:any) => {
    const resp = await send({
      body: { lookupKey },
    });

    if (resp.error) {
      console.error("Error creating checkout session:", resp.error);
      return;
    }
    //@ts-ignore
    if (resp.res && resp.res.url) {
      //@ts-ignore
      window.location.href = resp.res.url;
    } else {
      console.error("Invalid response data:", resp.res);
    }
  };

  return (
    <Holder className="p-2 pt-32">
      <div className="centered-container relative -z-0">
        <h2 className="text-4xl w-full text-center font-semibold mt-5">
          Избери пакет
        </h2>
        <div className="flex flex-col gap-5 mt-5">
          {packages.map((pkg) => (
            <div key={pkg.lookupKey} className="flex flex-col items-center border p-4 rounded shadow-md">
              <h3 className="text-2xl font-bold">{pkg.name}</h3>
              <p className="mt-2">{pkg.description}</p>
              <Button
                className="mt-4"
                onClick={() => handleBuyPackage(pkg.lookupKey)}
              >
                Купи {pkg.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Holder>
  );
}
