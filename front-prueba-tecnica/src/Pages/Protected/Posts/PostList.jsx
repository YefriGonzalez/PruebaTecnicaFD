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
  const { loading, error, data } = useQuery(GET_POSTS_QUERY);

  if (loading) return <CircularProgress />; // Mostrar un loader mientras carga
  if (error) return <p>Error al cargar los posts: {error.message}</p>;
  return (
    <Container>
      <Box sx={{
        display:'flex',
        justifyContent:'space-around'
      }}>
        <Typography variant="h4" gutterBottom>
          Listado de Posts
        </Typography>
        <Button variant="contained">
            <Add/> Agregar post
        </Button>
      </Box>

      <Grid2 container spacing={3}>
        {data?.posts?.map((post) => (
          <Grid2 item xs={12} sm={6} md={4} key={post.id}>
            <Card
              component={Link}
              to={`/post/${post.id}`}
              style={{ textDecoration: "none" }}
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
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default PostList;
