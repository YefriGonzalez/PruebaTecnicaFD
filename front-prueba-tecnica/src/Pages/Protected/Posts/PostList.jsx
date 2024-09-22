import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { Add } from "@mui/icons-material";
import ModalPost from "./ModalPost";
const GET_POSTS_QUERY = gql`
  query GetPosts {
    posts {
      id
      title
      authorId
      content
      createdAt
      updatedAt
    }
  }
`;

const PostList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_POSTS_QUERY);
  const refetchPosts = () => {
    refetch();
  };

  if (loading) return <CircularProgress />; // Mostrar un loader mientras carga
  if (error) return <p>Error al cargar los posts: {error.message}</p>;
  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Listado de Posts
          </Typography>
          <Button variant="contained" onClick={() => setModalOpen(!modalOpen)}>
            <Add /> Agregar post
          </Button>
        </Box>
        <div className="flex flex-row justify-content-between flex-wrap w-100 mt-4">
          {data?.posts?.map((post) => (
            <Card
              component={Link}
              variant="elevation"
              color="primary"
              to={`/post/${post.id}`}
              sx={{
                textDecoration: "none",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "0.3s",
                backgroundColor: "#f5f5f5",
                width: "31%", 
                margin: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Autor: {post.authorId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content.substring(0, 100)}...{" "}
                  {/* Muestra un resumen del contenido */}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(post.createdAt).toLocaleDateString()}{" "}
                  {/* Formato de fecha */}
                </Typography>
              </CardContent>
              <CardActions>
                <Typography variant="button" color="primary">
                  Ver más
                </Typography>
              </CardActions>
            </Card>
          ))}
        </div>
      </Container>
      {modalOpen && (
        <ModalPost
          setOpen={setModalOpen}
          open={modalOpen}
          refetchPosts={refetchPosts}
        />
      )}
    </>
  );
};

export default PostList;
