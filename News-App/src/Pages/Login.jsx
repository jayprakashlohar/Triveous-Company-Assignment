// "use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
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
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [emailError, setEmailError] = useState("");
  const toast = useToast();

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleGoogleSignIn = async () => {
    let res = await signInWithPopup(auth, provider);
    localStorage.setItem("login", JSON.stringify({ email: res.user.email }));
    return navigate("/");
  };

  let getregister = JSON.parse(localStorage.getItem("register")) || [];

  const login = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }

    let detail = getregister.find(
      (el) => el.email === email && el.password === password
    );

    if (detail) {
      localStorage.setItem("login", JSON.stringify({ email, password }));
      toast({
        title: "Successfully Login",
        description: "Congrats, You are successfully logged In",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // return navigate("/");
      return (window.location.href = "/");
    } else {
      toast({
        title: "Account Does not exist",
        description: "Please create your account",
        status: "error",
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
          Sign In
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="Your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            variant="flushed"
            required
          />
          {emailError && (
            <Text fontSize="sm" color="red.500">
              {emailError}
            </Text>
          )}
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Enter your password"
              type={show ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              variant="flushed"
            />
            <InputRightElement
              h={"full"}
              cursor="pointer"
              onClick={() => setShow((showPassword) => !showPassword)}
            >
              {show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={6}>
          <Button
            borderRadius="5px"
            mt="10px"
            bg="#000"
            color="#ffff"
            _hover={{
              bg: "black.100",
            }}
            onClick={login}
          >
            Login
          </Button>
        </Stack>
        <Stack pt={4}>
          <Text align={"center"} fontSize="14px" fontWeight="500">
            New User ?{" "}
            <Link to="/register" style={{ color: "#099ded" }}>
              Register
            </Link>
          </Text>
        </Stack>
        <Button
          onClick={handleGoogleSignIn}
          rightIcon={<FcGoogle />}
          variant="solid"
        >
          LogIn With
        </Button>
      </Stack>
    </Flex>
  );
}
