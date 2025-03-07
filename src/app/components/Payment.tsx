"use client";
import { useState } from "react";
import { ConfigProvider, Radio } from "antd";
import { useRouter } from "next/navigation";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePaymentMutation } from "@/services/auth/AuthService";
import toast from "react-hot-toast";

interface OTPFormProps {
    nextStep: () => void;
}

const cardStyle = {
    base: {
        fontSize: "14px",
        color: "#18181B",
        fontFamily: "Inter, sans-serif",
        "::placeholder": { color: "#71717A" },
        padding: "10px",
    },
    invalid: { color: "#fa755a" },
};

const Membership: React.FC<OTPFormProps> = ({ nextStep }) => {
    const router = useRouter()
    const onSubmit = async (id: string) => {
        try {
            // Wait for the API call to finish before showing messages
            await mutateAsync({ id });

            toast.success("Payment successful! Proceed to login");
            console.log("Data saved!", id);
            router.push("/login");
        } catch (error: any) {
            toast.error(error || "Payment failed");
        }
    };
    const { mutateAsync, isLoading } = usePaymentMutation();

    const stripe = useStripe();
    const elements = useElements();
    const [name, setName] = useState("");

    const handlePayment = async () => {
        if (!stripe || !elements) {
            console.error("Stripe has not loaded yet.");
            return;
        }

        // Get card details from Stripe Elements
        const cardElement = elements.getElement(CardNumberElement);
        if (!cardElement) {
            console.error("Card Element not found.");
            return;
        }

        try {
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: { name },
            });

            if (error) {
                console.error("Payment Method Error:", error.message);
                return;
            }
            console.log("response", paymentMethod)
            console.log("Payment Method ID:", paymentMethod.id);
            onSubmit(paymentMethod.id)
        } catch (err) {
            console.error("Error creating payment method:", err);
        }
    };

    return (
        <>
            <div className="h-fit flex w-full gap-4 flex-col md:flex-row">
                <div className="w-full flex-col">
                    <h1 className="text-xl font-medium mt-8">Membership</h1>
                    <p className="text-[#BDBDBD] w-1/2">Get All Access</p>
                    <div className="mt-4 md:mt-10 grid grid-cols-1 md:grid-cols-3 w-fit gap-4">
                        <div className="col-span-2">
                            <Label className="mt-10">Billed to</Label>
                            <Input
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className="mt-4">
                                <Label>Card Number</Label>
                                <div className="border p-2 rounded-lg border-[#BDBDBD] h-10 focus-within:ring-2 focus-within:ring-black">
                                    <CardNumberElement className="pt-1 w-full" options={{ style: cardStyle }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 pt-6">
                            <div className="border border-[#BDBDBD] p-6 rounded-lg h-fit">
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: "#28cdba",
                                            borderRadius: 2,
                                            colorBgContainer: "#f6ffed",
                                        },
                                    }}
                                >
                                    <Radio defaultChecked>Pay Monthly</Radio>
                                </ConfigProvider>
                                <p className="text-[#BDBDBD] text-xs pl-6 pt-3">$18 / Monthly</p>
                            </div>
                        </div>
                    </div>

                    {/* Expiry and CVC Fields */}
                    <div className="flex flex-col mt-4 gap-3">
                        <div>
                            <Label>Expiry Date</Label>
                            <div className="border pt-1 rounded-lg border-[#BDBDBD] w-1/2 h-10 focus-within:ring-2 focus-within:ring-[#4FD1C5]">
                                <CardExpiryElement className="p-2" options={{ style: cardStyle }} />
                            </div>
                        </div>
                        <div>
                            <Label>CVC</Label>
                            <div className="border pt-1 rounded-lg border-[#BDBDBD] w-1/2 h-10 focus-within:ring-2 focus-within:ring-[#4FD1C5]">
                                <CardCvcElement className="p-2" options={{ style: cardStyle }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center">
                <Button
                    size="lg"
                    className="mt-28 h-10 w-full bg-[#4FD1C5] hover:text-[#4FD1C5] hover:bg-white hover:outline-[#4FD1C5]"
                    onClick={handlePayment}
                >
                    Confirm Payment
                </Button>
            </div>
        </>
    );
};

export default Membership;
