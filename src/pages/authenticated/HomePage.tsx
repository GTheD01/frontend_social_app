import SuggestedPeople from "../../components/pagecomponents/SuggestedPeople";
import PopularPost from "../../components/pagecomponents/PopularPost";
import PostForm from "../../components/forms/PostForm";
import PostsList from "../../components/pagecomponents/PostsList";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useAppSelector } from "../../redux/hooks";

import { useRetrievePopularPostQuery } from "../../redux/features/postsApiSlice";

const HomePage = () => {
  const { isLoading, isFetching } = useInfiniteScroll();

  const { suggested_people } = useAppSelector((state) => state.user);
  const posts = useAppSelector((state) => state.post.posts);
  const { data: popularPost } = useRetrievePopularPostQuery();

  return (
    <div className="flex justify-center gap-4 w-full h-full">
      <div className="w-full max-w-[630px] min-w-96 h-full">
        <PostForm />
        {!isLoading && (
          <PostsList
            isLoading={isLoading}
            posts={posts}
            isFetching={isFetching}
          />
        )}
      </div>

      <div className="mr-4 w-72 ">
        <PopularPost
          postId={popularPost?.id}
          postDate={popularPost?.created_at_formatted}
          logo={
            popularPost?.attachments && popularPost.attachments.length > 0
              ? popularPost?.attachments[0]?.get_image
              : "/logo192.png"
          }
          postAuthor={popularPost?.created_by.username}
          postContent={popularPost?.body}
        />

        <div className="bg-white p-4 mt-10 rounded-md">
          <h2>Suggested people</h2>
          <div>
            {suggested_people?.map((person) => (
              <SuggestedPeople
                key={person.id}
                username={person.username}
                fullName={person.full_name}
                avatar={person.get_avatar}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
