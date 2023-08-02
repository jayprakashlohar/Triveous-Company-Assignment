import React, { useEffect, useState } from "react";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Link,
  useToast,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
function SingleNews() {
  const { name } = useParams();
  const toast = useToast();
  const [like, setLike] = useState(false);
  let allnews = JSON.parse(localStorage.getItem("news")) || [];
  let detailnews = allnews?.find((el) => el.source.name === name);
  console.log(detailnews, "details");
  let addliked = JSON.parse(localStorage.getItem("fav")) || [];
  useEffect(() => {
    let alreadyadded = addliked.find(
      (el) => el.source.name === detailnews.source.name
    );
    if (like && !alreadyadded) {
      addliked.push(detailnews);
      localStorage.setItem("fav", JSON.stringify(addliked));
      toast({
        title: "Successfully Added to Favourite",
        description: "Added to Favourite",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else if (alreadyadded) {
      let removed = addliked.filter(
        (el) => el.source.name !== detailnews.source.name
      );
      localStorage.setItem("fav", JSON.stringify(removed));
      toast({
        title: "Successfully Removed to Favourite",
        description: "Removed to Favourite",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [like]);
  return (
    <Container maxW={"7xl"}>
      <Button
        rounded={"none"}
        display={"flex"}
        float={"right"}
        mt={8}
        size={"lg"}
        py={"7"}
        bg="none"
        textTransform={"uppercase"}
        _hover={{
          transform: "translateY(2px)",
          boxShadow: "lg",
        }}
        onClick={() => setLike((like) => !like)}
      >
        {like ? <BsHeartFill /> : <FaRegHeart />}
      </Button>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={detailnews.urlToImage}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {detailnews.title}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {detailnews.author}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                {detailnews.content}
              </Text>
              <Text fontSize={"lg"}>{detailnews.description}</Text>
            </VStack>
          </Stack>
          <Link href={detailnews.url}>Full Article</Link>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

export default SingleNews;
