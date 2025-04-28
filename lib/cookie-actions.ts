// @ts-nocheck
"use server";

import { cookies } from "next/headers";

export type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export async function setCookieConsent(consent: CookieConsent) {
  try {
    cookies().set({
      name: "cookie_consent",
      value: JSON.stringify(consent),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    return { success: true };
  } catch (error) {
    console.error("Error setting cookie consent", error);
    return { success: false, error };
  }
}

export async function getCookieConsent(): Promise<CookieConsent> {
  const cookieConsent = cookies().get("cookie_consent");

  if (!cookieConsent) {
    return {
      necessary: false,
      analytics: false,
      marketing: false,
    };
  }

  try {
    return JSON.parse(cookieConsent.value);
  } catch (error) {
    console.error("Error parsing cookie consent", error);
    return {
      necessary: false,
      analytics: false,
      marketing: false,
    };
  }
}
