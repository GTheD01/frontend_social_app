import logo from "../../assets/result.png";
import PostForm from "../../components/forms/PostForm";
import PopularPost from "../../components/pagecomponents/PopularPost";
import SuggestedPeople from "../../components/pagecomponents/SuggestedPeople";

const HomePage = () => {
  return (
    <div className="flex justify-center gap-4 w-full h-full">
      <div className="w-full max-w-[630px] min-w-96 h-full">
        <PostForm />
        <div className="pt-12 px-4 break-words">Users Posts</div>
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
