"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { BrandingFormData, brandingFormSchema } from "@/types/branding";
import { StepOne } from "@/components/branding/step-one";
import { StepTwo } from "@/components/branding/step-two";
import { StepThree } from "@/components/branding/step-three";
import { StepFour } from "@/components/branding/step-four";
import { StepFive } from "@/components/branding/step-five";

const steps = ["Brand Basics", "Logo Style", "Typography", "Colors", "Deliverables"];

export default function BrandingPage() {
  const [step, setStep] = useState<number>(1);
  const router = useRouter();

  const form = useForm<BrandingFormData>({
    resolver: zodResolver(brandingFormSchema),
    defaultValues: {
      step1: {
        brandName: "",
        language: "english",
      },
      step2: {
        logoStyle: "textOnly",
      },
      step3: {
        fontStyles: [],
      },
      step4: {
        colors: [],
      },
      step5: {
        deliverables: [],
      },
    },
  });

  const onSubmit = (data: BrandingFormData) => {
    setCookie("brandingData", JSON.stringify(data));
    router.push("/branding/results");
  };

  const nextStep = async () => {
    const stepKey = `step${step}` as keyof BrandingFormData;
    const isValid = await form.trigger(stepKey);
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <Card>
          <CardHeader>
            <CardTitle>Request Your Brand Identity</CardTitle>
            <div className='flex justify-between mt-4'>
              {steps.map((stepTitle, index) => (
                <div key={stepTitle} className={`text-sm ${step === index + 1 ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  {index + 1}
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                {step === 1 && <StepOne form={form} />}
                {step === 2 && <StepTwo form={form} />}
                {step === 3 && <StepThree form={form} />}
                {step === 4 && <StepFour form={form} />}
                {step === 5 && <StepFive form={form} />}

                <div className='flex justify-between'>
                  {step > 1 && (
                    <Button type='button' variant='outline' onClick={prevStep}>
                      Back
                    </Button>
                  )}
                  {step < 5 ? (
                    <Button type='button' onClick={nextStep}>
                      Next
                    </Button>
                  ) : (
                    <Button type='submit'>Generate Results</Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
