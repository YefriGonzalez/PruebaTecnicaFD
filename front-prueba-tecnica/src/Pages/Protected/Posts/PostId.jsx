import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CircularProgress,
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ArrowBack } from "@mui/icons-material";

const GET_POST_QUERY = gql`
  query GetPost($id: Int!) {
    postFindOne(id: $id) {
      id
      content
      title
      author {
        id
        username
      }
      comments {
        content
        author {
          username
          email
        }
      }
    }
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($postId: Int!, $commentPostInput: CommentPostInput!) {
    createComment(postId: $postId, commentPostInput: $commentPostInput) {
      id
      content
      authorId
      postId
    }
  }
`;

const PostDetail = () => {
    const navigate=useNavigate()
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST_QUERY, {
    variables: {
      id: Number(id),
    },
  });

  const [newComment, setNewComment] = useState("");
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    refetchQueries: [{ query: GET_POST_QUERY, variables: { id: Number(id) } }],
    onCompleted: () => setNewComment(""),
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      createComment({
        variables: {
          postId: Number(id),
          commentPostInput: { content: newComment },
        },
      });
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error al cargar el post: {error.message}</p>;

  const post = data?.postFindOne;
  return (
    <Container>
        <IconButton onClick={()=>navigate('/posts')}>
            <ArrowBack/>
        </IconButton>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Autor: {post.author.username}
          </Typography>
        </CardContent>
      </Card>

      <form onSubmit={handleCommentSubmit}>
        <TextField
          label="Nuevo comentario"
          variant="outlined"
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{ marginTop: "20px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Agregar Comentario
        </Button>
      </form>
      <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
        Comentarios
      </Typography>
      <List>
        {post.comments.map((comment, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={comment.content}
              secondary={`Por: ${comment.author.username} (${comment.author.email})`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PostDetail;
