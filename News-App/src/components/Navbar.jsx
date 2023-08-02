import React from "react";
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
    ? { name: "Logout", action: () => handleLogout(), page: "/" }
    : { name: "Login", page: "/login" },
  !JSON.parse(localStorage.getItem("login"))?.email && {
    name: "Register",
    page: "/register",
  },
  { name: "Favourite Articles", page: "/favouritenews" },
  { name: "All News", page: "/" },
];

const handleLogout = () => {
  localStorage.removeItem("login");
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box px={4} bg="black">
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          maxWidth="100%"
          mx="auto"
        >
          <Box fontWeight={"extrabold"} color="white" fontSize="25px">
            <Link to={"/"}>News-App</Link>
          </Box>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack as={"nav"} display={{ base: "none", md: "flex" }}>
            {Links?.map((link) =>
              link.name === "Logout" ? (
                <Button
                  key={link.name}
                  onClick={link.action}
                  bg={"black"}
                  color={"white"}
                  fontFamily="sans-serif"
                  _hover={{ background: "none", textDecoration: "underline" }}
                >
                  {link.name}
                </Button>
              ) : (
                <Link key={link.name} to={link.page}>
                  <Button
                    bg={"black"}
                    color={"white"}
                    fontFamily="sans-serif"
                    _hover={{ background: "none", textDecoration: "underline" }}
                  >
                    {link.name}
                  </Button>
                </Link>
              )
            )}
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }} fontWeight={"extrabold"}>
            <Stack as={"nav"} spacing={4}>
              {Links?.map((link) =>
                link.name === "Logout" ? (
                  <Button
                    key={link.name}
                    onClick={link.action}
                    _hover={{ color: "gray" }}
                    bg={"black"}
                    color={"white"}
                  >
                    {link.name}
                  </Button>
                ) : (
                  <Link key={link.name} to={link.page}>
                    <Button
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
                )
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
