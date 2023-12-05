"use client";
import Card from "@/components/bootstrap/Card";
import Row from "@/components/bootstrap/Row";
import Col from "@/components/bootstrap/Col";
import CenterElement from "@/components/bootstrap/CenterElement";
import LargeSpinner from "@/components/loading/LargeSpinner";
import { useEffect, useState, useContext } from "react";
import { userService } from "@/services/userService";
import { alertService } from "@/services/alertService";
import { UserAuthContext } from "@/components/UserAuthContext";
import UpdateUserForm from "@/components/forms/UpdateUser";
import {useRouter} from "next/navigation";

const InfoPage = () => {
  const { signedIn, setSignedIn, baseUrl } = useContext(UserAuthContext);
  const [userInfoExists, setUserInfoExists] = useState(null);
  const router = useRouter();
  async function getUserInfo() {
    setTimeout(async () => {
      if (
        signedIn.loggedIn &&
        signedIn.firstname != null &&
        signedIn.lastname != null &&
        signedIn.email != null
      ) {
        setUserInfoExists(true);
        return;
      }
      await userService
        .getUserInfo(baseUrl)
        .then((result) => {
          const combinedName = `${result.firstName} ${result.lastName}`;
          setUserInfoExists({ email: result.email, name: combinedName });
          setSignedIn({
            firstname: result.firstName,
            lastname: result.lastName,
            email: result.email,
            loggedIn: true,
            role: result.role,
          });
        })
        .catch(async (error) => {
          console.log(error);
          router.push("/account/login");
          setSignedIn({
            loggedIn: false,
            firstname: null,
            lastname: null,
            role: null,
            email: null,
          });
          // await userService.logout();
          alertService.warning("In order to access this page you must login");
        });
    }, 1000);
  }

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="page">
      <Row>
        <Col ColNumSize="3"> </Col>
        <Col ColNumSize="6">
          <CenterElement>
            <Card header="Profile" className="mt-5">
              <CenterElement>
                <section>
                  <div>
                    {userInfoExists ? (
                      <div>
                        <h2 className="text-center">Update User Info</h2>
                        <UpdateUserForm info={signedIn} />
                      </div>
                    ) : (
                      <CenterElement>
                        <LargeSpinner />
                      </CenterElement>
                    )}
                  </div>
                  <CenterElement>
                    {signedIn.role === "Admin" ? (
                      <>
                        {/* <NavLink
                          to="/account/manage"
                          className="btn btn-primary m-1 mt-4"
                        >
                          Manage Accounts
                        </NavLink> */}
                        {/* <NavLink
                          to="/db/cs-manage"
                          className="btn btn-primary m-1 mt-4"
                        >
                          See Databases
                        </NavLink> */}
                      </>
                    ) : (
                      ""
                    )}
                  </CenterElement>
                </section>
              </CenterElement>
            </Card>
          </CenterElement>
        </Col>
        <Col ColNumSize="3"> </Col>
      </Row>
    </div>
  );
};

export default InfoPage;
