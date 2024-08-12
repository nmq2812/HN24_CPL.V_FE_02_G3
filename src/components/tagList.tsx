import getTags from "@/api/tags";

const TagList = async () => {
    const tags = await getTags();
    console.log(tags);
    return (
        <div className="tag-list">
            {tags.map((tag) => (
                <a href="" className="tag-pill tag-default">
                    {tag}
                </a>
            ))}
        </div>
    );
};

export default TagList;
