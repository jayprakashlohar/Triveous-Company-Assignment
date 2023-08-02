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

function Allnews() {
  const [allnews, setAllnews] = useState([]);
  const [grid, setGrid] = useState(false);
  const [total, setTotal] = useState(0);
  const api = `https://newsapi.org/v2/top-headlines?country=us&apiKey=0593ba556f5d4d33978b00fa62d15097`;
  useEffect(() => {
    const getdata = async () => {
      let res = await fetch(api);
      let data = await res.json();
      setAllnews(data.articles);
      setTotal(data.articles.length);
      localStorage.setItem("news", JSON.stringify(data.articles));
      console.log(data.articles.length, Math.ceil((total - 1) / 2));
    };
    getdata();
  }, []);
  return (
    <Box>
      <Heading>Top Latest News</Heading>
      <Button onClick={() => setGrid((grid) => !grid)}>
        {grid ? "GRID VIEW" : "LIST VIEW"}
      </Button>
      {!grid && (
        <Grid
          templateColumns="repeat(2, 1fr)"
          border={"3px solid black"}
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
                border={"1px solid black"}
                color={"blue"}
              >
                <ListItem textAlign={"justify"}>
                  <Link to={`/detailnews/${el.source.name}`}>{el.title}</Link>
                </ListItem>
              </UnorderedList>
            ))}
        </Grid>
      )}
      {grid && (
        <Grid
          templateColumns="repeat(4, 1fr)"
          border={"2px solid black"}
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
                border={"1px solid black"}
                color={"blue"}
              >
                <ListItem textAlign={"justify"}>
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
