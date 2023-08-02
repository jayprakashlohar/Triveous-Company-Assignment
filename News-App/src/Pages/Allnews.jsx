import {
  Box,
  Button,
  Grid,
  Heading,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import axios from "axios";

let apiKey = "60fb3e071f474bb9bf64c6929572185d";

function Allnews() {
  const [allnews, setAllnews] = useState([]);
  const [grid, setGrid] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );
        setAllnews(response.data.articles);
        localStorage.setItem("news", JSON.stringify(response.data.articles));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="90%"
        m="auto"
        p="20px"
      >
        <Heading fontSize="30px" padding="18px" fontFamily="sans-serif">
          Top Latest News
        </Heading>
        <Button
          colorScheme="teal"
          mb="10px"
          onClick={() => setGrid((grid) => !grid)}
        >
          {grid ? <BsFillGrid3X3GapFill /> : <FaThList />}
        </Button>
      </Box>

      {!grid && (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
          }}
          shadow="base"
          w={"90%"}
          m={"auto"}
        >
          {allnews &&
            allnews.map((el) => (
              <UnorderedList
                gap={10}
                w="90%"
                m={"5"}
                p={"8"}
                shadow="lg"
                color={"blue"}
              >
                <ListItem textAlign={"justify"} fontFamily="sans-serif">
                  <Link to={`/detailnews/${el.source.name}`}>{el.title}</Link>
                </ListItem>
              </UnorderedList>
            ))}
        </Grid>
      )}

      {grid && (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          shadow="base"
          w={"90%"}
          m={"auto"}
        >
          {allnews &&
            allnews.map((el) => (
              <UnorderedList
                gap={10}
                w="90%"
                m={"5"}
                p={"5"}
                shadow="lg"
                color={"blue"}
              >
                <ListItem textAlign={"justify"} fontFamily="sans-serif">
                  <Link to={`/detailnews/${el.source.name}`}>{el.title}</Link>
                </ListItem>
              </UnorderedList>
            ))}
        </Grid>
      )}
    </Box>
  );
}

export default Allnews;
