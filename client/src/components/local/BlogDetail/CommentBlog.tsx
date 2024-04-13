interface CommentBlogProps {
  id: string
}
const CommentBlog = ({ id }: CommentBlogProps) => {
  console.log(id)

  return <div>CommentBlog</div>
}

export default CommentBlog
