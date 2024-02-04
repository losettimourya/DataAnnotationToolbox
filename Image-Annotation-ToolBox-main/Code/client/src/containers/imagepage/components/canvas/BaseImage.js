import React from "react";
import { Image, Layer } from "react-konva";
import useImage from "use-image";
import { useContext } from "react";
import useStore from "../../library/store";
import StageContext from "../../ContextProvider";
const IMAGE_NUMBER = 1 + Math.round(Math.random() * 1);
const IMAGE_URL = `image-${IMAGE_NUMBER}.jpg`;

export default (props) => {
  const currImage = props.imageURL;
  const imageList = useStore((state) => state.imageList);
  const imageIndex = useStore((state) => state.imageIndex);
  const setImageIndex = useStore((state) => state.setRegions);
  const gridsize = useStore((state) => state.gridsize);
  const [image] = useImage(currImage, "Anonymous");
  // const [image] = useImage("https://upload.wikimedia.org/wikipedia/commons/archive/f/f5/20081216020702%21Poster-sized_portrait_of_Barack_Obama.jpg", "Anonymous");

  const setImageSize = useStore((state) => state.setImageSize);
  const scale = useStore((state) => state.scale);
  const setScale = useStore((state) => state.setScale);
  const setSize = useStore((state) => state.setSize);
  const width = useStore((state) => state.width);
  const height = useStore((state) => state.height);
  const stageScale = useStore((state) => state.stageScale);
  const { brightness } = useStore();
  const setStageScale = useStore((state) => state.setStageScale);
  const setOrignalScale = useStore((state) => state.setOrignalScale);
  const gridview = useStore((state) => state.gridview);
  const setgridview = useStore((state) => state.setgridview);
  const handleLoad = (
    image,
    width,
    height,
    setScale,
    setImageSize,
    setSize
  ) => {
    /**
     * Handles the loading of an image, calculates its scaled dimensions based on the provided width and height constraints,
     * and updates the state with the new scale and image size.
     *
     * @function
     * @param {object} image - The image object to be loaded.
     * @param {number} width - The maximum width constraint for the image.
     * @param {number} height - The maximum height constraint for the image.
     * @param {function} setScale - A function to set the scale state.
     * @param {function} setImageSize - A function to set the image size state.
     * @param {function} setSize - A function to set the size state.
     * @returns {void}
     */
    if (!image) {
      return;
    }

    let temp_scale = 1;
    let ratio = 1;
    let scaledWidth = 0;
    let scaledHeight = 0;

    if (width / image.width < height / image.height) {
      ratio = width / image.width;
      temp_scale = width / image.width;
      scaledWidth = width;
      scaledHeight = image.height * ratio;
    } else {
      ratio = height / image.height;
      temp_scale = height / image.height;
      scaledWidth = image.width * ratio;
      scaledHeight = height;
    }
    if (scale == 0) {
      stageScale.scaleX = temp_scale;
      stageScale.scaleY = temp_scale;
      setStageScale(stageScale);
      setOrignalScale(stageScale);
    }
    if (gridsize > 1) {
      image.width = window.innerWidth / gridview[0];
      image.height = window.innerHeight / gridview[1];
    }
    setImageSize({ width: scaledWidth, height: scaledHeight });
    setScale(temp_scale);
  };

  React.useEffect(() => {
    handleLoad(image, width, height, setScale, setImageSize, setSize);
  }, [image, width, height, setScale, setImageSize, setSize]);
  const layerRef = React.useRef(null);
  const image_width = "70px";
  const image_height = "70px";
  return (
    <Layer ref={layerRef}>
      <Image image={image} style={{ width: "10vw", height: "10vh" }} />
    </Layer>
  );
};
