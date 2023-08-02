"use client";
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
import { useState } from "react";
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
  const toast = useToast();

  const handleGoogleSignIn = async () => {
    let res = await signInWithPopup(auth, provider);
    localStorage.setItem("login", JSON.stringify({ email: res.user.email }));
    return (window.location.href = "/");
  };
  let getregister = JSON.parse(localStorage.getItem("register")) || [];
  const login = () => {
    let detail = getregister.find(
      (el) => el.email === email && el.password === password
    );
    if (detail) {
      localStorage.setItem("login", JSON.stringify({ email, password }));
      toast({
        title: "Successfully Login",
        description: "Congrats,You are successfully logged In",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      return navigate("/");
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
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
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
            onClick={login}
          >
            Login
          </Button>
        </Stack>
        <Stack pt={6}>
          <Text align={"center"}>
            New User ?{" "}
            <Link to="/register" style={{ color: "#099ded" }}>
              Register
            </Link>
          </Text>
        </Stack>
        <Button onClick={handleGoogleSignIn}>
          <Text>LogIn With </Text>
          <FcGoogle />
        </Button>
      </Stack>
    </Flex>
  );
}
