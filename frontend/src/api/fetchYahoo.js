import { YAHOO_CLIENT_ID } from "@env";
import axios from "axios";
import fetchWiki from "./fetchWiki";

const fetchYahoo = async () => {
  const url = `https://map.yahooapis.jp/geoapi/V1/reverseGeoCoder?lat=${props.latitude}&lon=${props.longitude}&appid=${YAHOO_CLIENT_ID}&output=json`;
  const res = await axios(url);
  const data = await res.data;
  console.log(data["Feature"][0]["Property"]["AddressElement"]);
  const name = data["Feature"][0]["Property"]["AddressElement"][0]["Name"];
  const response = await fetchWiki(name);

  return await response;
};

export default fetchYahoo;
