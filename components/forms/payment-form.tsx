"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { User as UserProfile } from "@prisma/client";

import axios from "axios";
import payment from "@/lib/pay";

export type PaymentData = {
  amount: number;
  email: string;
  externalId: number;
  clerkId: string;
  redirectUrl: string;
  message: string;
};

interface PaymentResponse {
  message: string;
  link: string;
  transId: string;
  dateInitiated: string;
  statusCode: number;
}

interface CheckpaymentStatus {
  transId: string;
  status: string;
  meduim: string;
  serviceName: string;
  amount: number;
  revenue: number;
  payerName: string;
  email: string;
  redirectUrl: string;
  externalId: string;
  userId: string;
  webhook: string;
  financialTransId:string;
  dateInitiated: string;
  dateconfirmed: string;

}

const PaymentForm = ({user}:{user:UserProfile}) => {
  const { email, clerkId } = user;
  const [paymentData, setPaymentData] = useState<PaymentData>({
    amount: 5000,
    email,
    externalId: 2000,
    clerkId,
    redirectUrl: "https://portal.ticsummit.org/",
    message: "Payment for Registration fee",
  });

  const initiatePayment = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const resp = await payment.initiatePay(paymentData);

      const newResposnse = resp as PaymentResponse;

      const checktransactionstatus = await payment.paymentStatus(
        newResposnse.transId
      );

      const newChecktransactionstatus = checktransactionstatus as CheckpaymentStatus;

      if(newChecktransactionstatus.status !== "success") {
        console.log("Payment not successful");
        console.log(newChecktransactionstatus);
      }

      setTimeout(() => {
        window.location.href = newResposnse.link;
      }, 5000);

      const updateData = {
        paid: true,
      };

      const userId = "ifdiuhfd"; //lol

      const updateResp = await axios.put(
        `/api/subscription/${userId}`,
        updateData
      );
      console.log(updateResp);

      console.log(updateResp);
    } catch (error) {
      console.error(error);
    }
  };

  // if (!User) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="space-y-4" onSubmit={initiatePayment}>
        <div className="flex w-full justify-center">
          <button type="submit" className="custom-button">
            Initiate Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
