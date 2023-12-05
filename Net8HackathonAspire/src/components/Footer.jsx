'use client'

import { useContext } from "react";
import { UserAuthContext } from "./UserAuthContext";
import NextLink from "./NextLink";
const Footer = () => {
  const { signedIn, setSignedIn } = useContext(UserAuthContext);
  return (
    <footer className=" my-1">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
          <NextLink className="nav-link px-2" path="/">
            Home
          </NextLink>
        </li>
        {signedIn?.loggedIn ? (
          <>
            <li className="nav-item">
              <NextLink className="nav-link px-2" path="/account">
                Profile
              </NextLink>
            </li>
            <li className="nav-item">
              <NextLink className="nav-link px-2" path="/db/cs-manage">
                Databases
              </NextLink>
            </li>
            <li className="nav-item">
              <NextLink className="nav-link px-2" path="/db/cs-new">
                New Connection
              </NextLink>
            </li>
            <li className="nav-item">
              <NextLink
                className="nav-link px-2"
                path="/account/manage"
              >
                Admin Tools
              </NextLink>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <NextLink className="nav-link px-2" path="/account/login">
                Login
              </NextLink>
            </li>
            <li className="nav-item">
              <NextLink
                className="nav-link px-2"
                path="/account/register"
              >
                Register
              </NextLink>
            </li>
          </>
        )}
        {/* <li className="nav-item">
          <NextLink
            className="nav-link px-2"
            path="/account/forgotpassword"
          >
            Forgot Password
          </NextLink>
        </li> */}
        {/* <li className="nav-item">
          <NextLink
            className="nav-link px-2"
            path="/account/resetpassword"
          >
            Reset Password
          </NextLink>
        </li> */}
        {/* <li className="nav-item">
          <NextLink
            className="nav-link px-2"
            path="/error"
          >
            Error Page
          </NextLink>
        </li> */}
      </ul>
      <p className="text-center">
        © 2023 Tucker Johnson, DotNet 8 Hackathon
      </p>
    </footer>
  );
};

export default Footer;
