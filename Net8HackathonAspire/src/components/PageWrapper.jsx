"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserAuthContext } from "@/components/UserAuthContext";
import Alert from "@/components/Alert";
import { useState, useEffect, useContext } from "react";
import { userService } from "@/services/userService";

export default function PageWrapper({ baseUrl, children }) {
  const [signedIn, setSignedIn] = useState({
    loggedIn: false,
    email: null,
    firstname: null,
    lastname: null,
  });

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  useEffect(() => {
    checkSignedIn();
  }, []);

  async function checkSignedIn() {
    let storageVal = localStorage.getItem("last-updated");
    if (storageVal == null) return;

    const cookieDate = new Date(storageVal);
    const currentDate = new Date();
    const timeDifference = currentDate - cookieDate;
    const minutesDifference = timeDifference / (1000 * 60);
    // if minutesDifference is less then 14 minutes don't need to refresh jwt
    if (minutesDifference <= 14) {
      setSignedIn((prev) => ({ ...prev, loggedIn: true }));
      return;
    }

    if (!signedIn.loggedIn) {
      await userService
        .refresh(baseUrl)
        .then((result) => {
          setSignedIn((prev) => ({ ...prev, loggedIn: true }));
          localStorage.setItem("last-updated", new Date());
        })
        .catch((error) => {
        });
    }
  }

  return (
    <>
      <UserAuthContext.Provider value={{ signedIn, setSignedIn, baseUrl }}>
        <Alert />
        <Navbar />
        {children}
        <Footer />
      </UserAuthContext.Provider>
    </>
  );
}
