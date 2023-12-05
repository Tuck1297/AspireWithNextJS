"use client";
import { userService } from "../services/userService";
import { alertService } from "../services/alertService";
import { UserAuthContext } from "./UserAuthContext";
import { useContext, useEffect, useState } from "react";
import NextLink from "./NextLink";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../public/logo.png";

const Navbar = () => {
  const { signedIn, setSignedIn, baseUrl } = useContext(UserAuthContext);
  const router = useRouter();
  //nextlink, navigate

  async function logout() {
    await userService
      .logout(baseUrl)
      .then((result) => {
        alertService.success(result);
        router.push("/");
        setSignedIn({
          loggedIn: false,
          firstname: null,
          lastname: null,
          email: null,
          role: null,
        });
      })
      .catch((error) => {
        alertService.error("Error while logging out.");
      });
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <NextLink className="navbar-brand" path="/">
            <Image
              alt="Hackathon Application Logo"
              src={logo.src}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "auto", height: "40px" }}
            ></Image>
          </NextLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 text-center" id="mainNavbar">
              <li className="nav-item">
                <NextLink className="nav-link" path="/">
                  Home
                </NextLink>
              </li>
              {signedIn?.loggedIn ? (
                <>
                  {" "}
                  <li className="nav-item">
                    <NextLink className="nav-link" path="/account">
                      Profile
                    </NextLink>
                  </li>
                  <li className="nav-item">
                    <NextLink className="nav-link" path="/dbmanage">
                      Databases
                    </NextLink>
                  </li>
                  <li className="nav-item">
                    <NextLink className="nav-link" path="/account/dbconnect">
                      New Connection
                    </NextLink>
                  </li>
                  <li className="nav-item">
                    <NextLink className="nav-link" path="/account/users">
                      Admin Tools
                    </NextLink>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link text-center w-100"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NextLink className="nav-link" path="/account/login">
                      Login
                    </NextLink>
                  </li>
                  <li className="nav-item">
                    <NextLink className="nav-link" path="/account/register">
                      Register
                    </NextLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
