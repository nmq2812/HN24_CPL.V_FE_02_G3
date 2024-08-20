import getTags from "@/apis/tags";

const TagList = async () => {
  const tags = await getTags();
  return (
      <div className="tag-list">
          {tags.map((tag, index) => (
              <a href="" className="tag-pill tag-default" key={index}>
                  {tag}
              </a>
          ))}
      </div>
  );
};

export default TagList;
