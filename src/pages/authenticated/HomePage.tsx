import SuggestedPeople from "../../components/pagecomponents/SuggestedPeople";
import PopularPost from "../../components/pagecomponents/PopularPost";
import Post from "../../components/pagecomponents/Post";
import PostForm from "../../components/forms/PostForm";
import Spinner from "../../components/common/Spinner";

import { useRetrievePostsQuery } from "../../redux/features/authApiSlice";

import logo from "../../assets/result.png";

import useSetUser from "../../hooks/useSetUser";

const HomePage = () => {
  const { data, isLoading } = useRetrievePostsQuery();

  useSetUser();

  return (
    <div className="flex justify-center gap-4 w-full h-full">
      <div className="w-full max-w-[630px] min-w-96 h-full">
        <PostForm />
        <div className="pt-12 px-4 break-words space-y-6 *:last:pb-16">
          {isLoading ? (
            <Spinner />
          ) : (
            data?.map((post) => (
              <Post
                post_owner={post.post_owner}
                post_saved={post.post_saved}
                user_liked={post.user_liked}
                likes_count={post.likes_count}
                attachments={post.attachments}
                image={post.created_by.get_avatar}
                username={post.created_by.username}
                created_at={post.created_at_formatted}
                body={post.body}
                key={post.id}
                postId={post.id}
              />
            ))
          )}
        </div>
      </div>

      <div className="mr-4 w-72 ">
        <PopularPost
          postDate="29 Jul 2024"
          logo={logo}
          postTitle="Title of the Post"
          postDescription="Text description of the ad that should be a little bit longer"
        />

        <div className="bg-white p-4 mt-10 rounded-md">
          <div className="flex justify-between">
            <h2>Suggested people</h2>
            <span>:</span>
          </div>
          <div>
            <SuggestedPeople
              logo={logo}
              username="Georgi Popeftimov"
              profession="Software Engineer"
            />
            <SuggestedPeople
              logo={logo}
              username="Georgi Popeftimov"
              profession="Software Engineer"
            />
            <SuggestedPeople
              logo={logo}
              username="Georgi Popeftimov"
              profession="Software Engineer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
