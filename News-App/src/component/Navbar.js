"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";


const Links = [
  JSON.parse(localStorage.getItem("login"))?.email
    ? { name: JSON.parse(localStorage.getItem("login"))?.email, page: "" }
    : { name: "Login", page: "/login" },
  !JSON.parse(localStorage.getItem("login"))?.email && {
    name: "Register",
    page: "/register",
  },
  { name: "Favourite Articles", page: "/favouritenews" },
  { name: "All News", page: "/" },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box px={4} bg="black">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={8}
            alignItems={"center"}
            fontWeight={"extrabold"}
            color={"white"}
          >
            <Link to={"/"}>
              <Box fontWeight={"extrabold"}>Home</Box>
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <Link to={link.page}>
                  {" "}
                  <Button
                    key={link.name}
                    _hover={{ color: "gray" }}
                    bg={"black"}
                    color={"white"}
                  >
                    {link.name}
                  </Button>
                </Link>
              ))}
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }} fontWeight={"extrabold"}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <Link to={link.page}>
                  {" "}
                  <Button
                    key={link.name}
                    _hover={{ color: "gray" }}
                    bg={"black"}
                    color={"white"}
                  >
                    {link.name === "Login" &&
                    JSON.parse(localStorage.getItem("login")).email
                      ? JSON.parse(localStorage.getItem("login")).email
                      : link.name}
                  </Button>
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
