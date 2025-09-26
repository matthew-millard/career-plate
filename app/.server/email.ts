import { data } from "@remix-run/node";
import React from "react";
import { Resend } from "resend";

interface Email {
  from: string; // add more sub domains here!
  to: string[];
  subject: string;
  reactEmailTemplate: React.ReactElement;
}

export async function sendEmail({
  from,
  to,
  subject,
  reactEmailTemplate,
}: Email) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const createEmailResponse = await resend.emails.send({
      from,
      to,
      subject,
      react: reactEmailTemplate,
    });

    return data(createEmailResponse, { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return data({ message: "An error occured" }, { status: 500 });
  }
}
