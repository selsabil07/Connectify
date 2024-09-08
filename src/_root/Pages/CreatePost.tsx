import PostF from "@/components/forms/PostF"

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img 
            src="/assets/icons/add-post.svg" 
            alt="add"
            width={36}
            height={36}
             />
            <h2 className="h2-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>
        <PostF/>
      </div>
    </div>
  )
}

export default CreatePost