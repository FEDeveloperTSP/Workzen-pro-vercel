"use client"
import React, { useState, useEffect } from 'react';
import RegisterForm from './RegisterForm';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from '@stripe/stripe-js';
import dynamic from 'next/dynamic';

// Lazy load components
const OTP = dynamic(() => import('./OTP'), { ssr: false });
const Membership = dynamic(() => import('./Payment'), { ssr: false });

// Load Stripe key from environment variables
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY; // Ensure it's prefixed with NEXT_PUBLIC
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const RegisterParent = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("")
    // Load the saved step from localStorage on mount
    useEffect(() => {
        const savedStep = localStorage.getItem('registrationStep');
        if (savedStep) {
            setStep(Number(savedStep));
        }
    }, []);

    // Function to move to the next step and save it
    const nextStep = (email?: string) => {
        if (email) {
            setEmail(email); // Store email in state

        }
        setStep((prev) => {
            const newStep = prev + 1;
            localStorage.setItem('registrationStep', newStep.toString());
            return newStep;
        });
    };

    return (
        <>
            {step === 1 && <RegisterForm nextStep={nextStep} />}
            {step === 2 && <OTP email={email} nextStep={nextStep} />}
            {stripePromise && (
                <Elements stripe={stripePromise}>
                    {step === 3 && <Membership nextStep={nextStep} />}
                </Elements>
            )}
        </>
    );
};

export default RegisterParent;
