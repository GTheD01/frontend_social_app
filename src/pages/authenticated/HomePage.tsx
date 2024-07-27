const HomePage = () => {
  // TODO: WRITE IT ALL OVER

  return (
    <div className="flex justify-center gap-4 w-full">
      <div className="w-full max-w-[630px] min-w-96 h-full">
        <div className="bg-gray-300 p-4 w-full">
          <textarea
            placeholder="Write Something..."
            maxLength={1024}
            className="resize-none w-full bg-transparent outline-none h-44 pt-8"
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <span>Attach</span>
              <span>Location</span>
              <span>Emojis</span>
            </div>
            <button className="px-8 py-2 rounded-md bg-sky-500/70">Post</button>
          </div>
        </div>
        <div className="pt-12 px-4 break-words">Users Posts</div>
      </div>
      <div className="mr-4 w-72">
        <div>
          <img src="" alt="" />
          <div>
            <h6 className="text-sky-500">Popular</h6>
            <h3 className="font-semibold">Title of the ad</h3>
            <p>Text description of the ad that should be a little bit longer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
