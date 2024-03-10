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

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  console.log(email, password);

  const handClick = () => setShow(!show);

  const submitHandler = () => {};
  return (
    <VStack spacing={4}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
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
