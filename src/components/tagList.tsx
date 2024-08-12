import getTags from "@/api/tags";

const TagList: React.FC<Tags> = async () => {
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
