import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { Asset } from "expo-asset";
import DtStmnPresenter from "./DtStmnPresenter";

export default ({ navigation, route }) => {
 const cacheImages = (images) =>
  images.map((image) => {
   if (typeof image == "string") {
    return Image.prefetch(image);
   } else {
    return Asset.fromModule(image).downloadAsync();
   }
  });

 const _loadAssetsAsync = async () => {
  const imageAssets = cacheImages([
   "https://blue.teamfresh.co.kr/spec_example1.jpg",
  ]);

  await Promise.all([...imageAssets]);
 };

 const [dtStmn, setDtStmn] = useState({
  loading: true,
  images: [],
 });
 const getData = async () => {
  _loadAssetsAsync().then((images) => {
   //console.log(images);
   setDtStmn({
    loading: false,
    images: ["https://blue.teamfresh.co.kr/spec_example1.jpg"],
   });
  });
  /*
  cacheImages(["http://52.78.103.218/spec_example1.jpg"]).then((images) => {
   console.log(images);
   setDtStmn({
    loading: false,
    images,
   });
  });
  */
 };

 useEffect(() => {
  getData();
 }, []);

 return <DtStmnPresenter {...dtStmn} />;
};
