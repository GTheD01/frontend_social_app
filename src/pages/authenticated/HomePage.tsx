import SuggestedPeople from "../../components/pagecomponents/SuggestedPeople";
import PopularPost from "../../components/pagecomponents/PopularPost";
import PostForm from "../../components/forms/PostForm";
import PostsList from "../../components/pagecomponents/PostsList";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useAppSelector } from "../../redux/hooks";

import logo from "../../assets/result.png";

const HomePage = () => {
  const { isLoading, isFetching } = useInfiniteScroll();

  const { suggested_people } = useAppSelector((state) => state.user);
  const posts = useAppSelector((state) => state.post.posts);

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
          postDate="29 Jul 2024"
          logo={logo}
          postTitle="Title of the Post"
          postDescription="Text description of the ad that should be a little bit longer"
        />

        <div className="bg-white p-4 mt-10 rounded-md">
          <h2>Suggested people</h2>
          <div>
            {suggested_people.map((person) => (
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
