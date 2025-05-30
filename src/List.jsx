import { UseGetList } from "./hooks/useGetList";

const List = () => {
  const { data: posts, isError, isPending } = UseGetList();

  return (
    <div>
      {isError && <div>Oops! Something went wrong</div>}
      {isPending && <div>Loading...</div>}
      {!isPending && (
         <ol>
          { posts?.data.results.map((post) => {
            return <li key={ post.id }>
              { post.name }
              <img width="100" src={post.thumbnail.path + '.' + post.thumbnail.extension} alt={post.name} />
            </li>
          })}
        </ol>
      )}
    </div>
  );
}

export default List;