import React from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const Toast = useToast();
  console.log(email, password);
  const navigate = useNavigate();

  const handClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      Toast({
        title: "Invalid Input",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      Toast({
        title: "Login Success",
        description: "Successfully Logged In",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      // navigate("/chats");
    } catch (error) {
      setLoading(false);
      Toast({
        title: "Invalid Input",
        description: "Invalid email or password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <VStack spacing={4}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="5rem">
            <Button h="1.75rem" size="sm" onClick={handClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        className=" mt-4"
        w="95%"
        colorScheme="gray"
        variant="solid"
        onClick={submitHandler}
      >
        Login
      </Button>

      <Button
        w="95%"
        colorScheme="gray"
        variant="solid"
        onClick={() => {
          setEmail("guestuser@gmail.com");
          setPassword("guestuser");
        }}
      >
        Guest User
      </Button>
    </VStack>
  );
};

export default Login;
