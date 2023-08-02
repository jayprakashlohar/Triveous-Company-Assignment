import {
  Box,
  Grid,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Favourite() {
  let fav = JSON.parse(localStorage.getItem("fav")) || [];
  return (
    <Box>
      <Heading>Favourite Articles</Heading>
      <Grid
        templateColumns="repeat(1, 1fr)"
        border={"3px solid black"}
        w={"90%"}
        m={"auto"}
      >
        {fav.length > 0 ? (
          fav.map((el) => (
            <UnorderedList
              gap={10}
              w="90%"
              m={"5"}
              p={"5"}
              border={"1px solid black"}
              color={"blue"}
            >
              <ListItem textAlign={"justify"}>
                <Link to={`/detailnews/${el.source.name}`}>{el.title}</Link>
              </ListItem>
            </UnorderedList>
          ))
        ) : (
          <Text>No Favourite</Text>
        )}
      </Grid>
    </Box>
  );
}

export default Favourite;
