import { prisma } from "../../lib/prisma";
import { ICreatePostPayload, IUpdatePostPayload } from "./post.interface";

const createPost = async (payload: ICreatePostPayload, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });

  return result;
};

const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        omit: { password: true },
      },
      comments: true,
    },
  });
  return posts;
};

const getPostById = async (postId: string) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      author: {
        omit: { password: true },
      },
      comments: true,
    },
  });

  return updatedPost;
};

const getMyPosts = async (authorId: string) => {
  const result = await prisma.post.findMany({
    where: {
      authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
      author: {
        omit: { password: true },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  return result;
};

const updatePost = async (postId: string, payload: IUpdatePostPayload , authorId: string , IsAdmin: boolean) => {

    const post = await prisma.post.findUniqueOrThrow({
        where : {
            id : postId
        }
    })

    if(post.authorId !== authorId && !IsAdmin){
        throw new Error("You are not authorized to update this post");
    }

    const updatedPost = await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            ...payload,
        },
    });

    return updatedPost;
};

const deletePost = async (postId: string , authorId: string , IsAdmin: boolean) => {

    const post = await prisma.post.findUniqueOrThrow({
        where : {
            id : postId
        }
    })

    if(post.authorId !== authorId && !IsAdmin){
        throw new Error("You are not authorized to delete this post");
    }

   await prisma.post.delete({
        where: {
            id: postId,
        },
    });

    
};

export const postService = {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost
};
