import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { gql, useMutation } from "@apollo/client";
const CREATE_POST_MUTATION = gql`
  mutation CreatePost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      id
      title
      content
      authorId
      createdAt
      updatedAt
    }
  }
`;
export default function ModalPost({ open, setOpen, refetchPosts }) {
  const [createPost] = useMutation(CREATE_POST_MUTATION);

  const handleClose = () => {
    setOpen(!open);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const { title, content } = formJson;

    try {
      await createPost({
        variables: {
          createPostInput: { title, content },
        },
      });
      refetchPosts();
      handleClose();
    } catch (error) {
      console.error("Error al crear el post:", error);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit} PaperProps={{
      component: 'form',
      onSubmit: handleSubmit,
    }}>
      <DialogTitle>Agregar post</DialogTitle>
      <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Titulo"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="content"
            name="content"
            label="Contenido"
            type="text"
            fullWidth
            variant="standard"
            multiline
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button type="submit" >Agregar</Button>
      </DialogActions>
    </Dialog>
  );
}
