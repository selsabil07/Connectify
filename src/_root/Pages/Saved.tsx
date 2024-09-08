import { Models } from "appwrite";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  // Ensure savePosts is always an array
  const savePosts = currentUser?.save
    ? currentUser.save
        .map((savePost: Models.Document) => ({
          ...savePost.post,
          creator: {
            imageUrl: currentUser.imageUrl,
          },
        }))
        .reverse()
    : [];

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {/* If user data is still loading, show Loader */}
      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {/* Check if there are saved posts */}
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
