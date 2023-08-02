"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, Navigate, redirect } from "react-router-dom";

export default function Register() {
  const [register, setRegister] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const toast = useToast();

  const onchange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };
  let getregister = JSON.parse(localStorage.getItem("register")) || [];
  const registered = () => {
    let alreadexist = getregister.find((el) => el.email === register.email);
    if (alreadexist) {
      toast({
        title: "Account Aleardy Exist",
        description: "This email already register. Please login your account",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return (window.location.href = "/login");
    } else if (register.password.length >= 6) {
      getregister.push(register);
      localStorage.setItem("register", JSON.stringify(getregister));
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setRegister({ email: "", password: "" });
      return (window.location.href = "/login");
    } else {
      toast({
        title: "Password",
        description: "Password should be atleast 6 Characters",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Sign Up
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            value={register?.email}
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            onChange={onchange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              name="password"
              onChange={onchange}
              minLength={8}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShow((showPassword) => !showPassword)}
              >
                {show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={registered}
          >
            Register
          </Button>
        </Stack>
        <Stack pt={6}>
          <Text align={"center"}>
            Already a User ?{" "}
            <Link to="/login" style={{ color: "#099ded" }}>
              Login
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
}
