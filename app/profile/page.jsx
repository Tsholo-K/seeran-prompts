'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";


const ProfilePage = () => {

  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const handleEdit = (post) => {
    router.push(`/update-prompt/${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((item) => item._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {

    const fetchPosts = async () => {

      const res = await fetch(`api/users/${session?.user.id}/posts`,  { next: { revalidate: 0 } },);
      const data = await res.json();

      setPosts(data)
    };

    if (session?.user.id) {
      fetchPosts()
    };

  }, [session?.user.id]);
 
  return (
    <Profile
      name={'My'}
      desc={'welcome to your personalized page, here you can view all your prompts, edit and delete them'}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )

};

export default ProfilePage;