import { Icon, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { FaBell } from "react-icons/fa";

const Profile = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <FaBell onClick={onOpen} />
      )}
      {isOpen && (
        <div
          className="fixed top-0 right-0 w-full h-full bg-opacity-50"
          onClick={onClose}
        >
          <div className=" bg-gray-300 mt-28 ml-24 w-full h-full fixed top-0 right-0 p-5 border-4 border-green-800">
            <h1 className="text-2xl">Profile</h1>
            <h1 className="text-xl">{user.name}</h1>
            <h1 className="text-xl">{user.email}</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
