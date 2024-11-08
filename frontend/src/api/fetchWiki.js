import axios from "axios";

const fetchWiki = async () => {
  const url = `https://ja.wikipedia.org/w/api.php?action=query&list=search&srsearch=${name}&format=json&origin=*`;
  const res = await axios(url);
  const data = res.data;
  const description = data["query"]["search"][0]["snippet"];

  return description;
};

export default fetchWiki;
