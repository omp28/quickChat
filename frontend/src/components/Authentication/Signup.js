import {
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();

  const handClick = () => setShow(!show);

  const postDetails = (pic) => {};

  const submitHandler = () => {};

  return (
    <VStack spacing={4}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

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

      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="5rem">
            <Button h="1.75rem" size="sm" onClick={handClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Profile Picture</FormLabel>
        <Input
          type="file"
          p={1}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        w="70%"
        colorScheme="gray"
        variant="solid"
        onClick={submitHandler}
      >
        SignUp
      </Button>
    </VStack>
  );
};

export default Signup;
