import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { TagCloud } from "react-tagcloud";
import ReviewService from "../services/ReviewService";
import { useTranslation } from "react-i18next";
interface Itag {
  value: string;
  count: number;
}

const TagCloudComponent: React.FC = () => {
  const { t } = useTranslation();
  const [availableTags, setAvailableTags] = useState<Itag[]>([]);
  useEffect(() => {
    getTags();
  }, []);

  const getTags = async () => {
    try {
      const response = await ReviewService.fetchTags();
      const getAllTags = [...new Set(response.data.map((e) => e.tags))].map(
        (item) => ({
          value: item,
          count: Math.floor(10 + Math.random() * (40 + 1 - 10)),
        })
      );
      setAvailableTags(getAllTags);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <h4 className="pt-4">{t("tags")}</h4>
      <TagCloud
        minSize={12}
        maxSize={35}
        shuffle={true}
        disableRandomColor={true}
        tags={availableTags}
        className="tag-cloud"
        onClick={(tag: Itag) => alert(`'${tag.value}' was selected!`)}
      />
    </>
  );
};

export default observer(TagCloudComponent);
