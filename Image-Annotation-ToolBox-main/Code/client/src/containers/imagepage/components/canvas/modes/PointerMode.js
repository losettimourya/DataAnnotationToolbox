import React from "react";
import Konva from "konva";
import { Stage } from "react-konva";
import Regions from "../Regions";
import BaseImage from "../BaseImage";
import { useContext } from "react";
import StageContext from "../../../ContextProvider";
import useStore from "../../../library/store";
import { limitAttributes } from "../../../library/utils";
let id = 1;

export default (props) => {
  const imageURL = props.imageURL;
  const { width, height } = useStore((s) => ({
    width: s.width,
    height: s.height,
  }));
  const setSize = useStore((s) => s.setSize);
  const scale = useStore((state) => state.scale);
  const isDrawing = useStore((state) => state.isDrawing);
  const toggleDrawing = useStore((state) => state.toggleIsDrawing);

  const regions = useStore((state) => state.regions);
  const setRegions = useStore((state) => state.setRegions);
  const gridsize = useStore((state) => state.gridsize);
  const setgridsize = useStore((state) => state.setgridsize);
  const currimageid = useStore((state) => state.currimageid);
  const regionsdict = useStore((s) => s.regionsdict);
  const setregionsdict = useStore((s) => s.setregionsdict);

  let isMouseOverStartPoint = 0;
  const currStart = useStore((state) => state.currStart);
  const setCurrStart = useStore((state) => state.setCurrStart);

  const region_color = useStore((state) => state.color);

  const selectRegion = useStore((s) => s.selectRegion);
  const selectedRegions = useStore((s) => s.selectedRegions);
  const setSelectedRegions = useStore((s) => s.setSelectedRegions);

  const selectedregion = useStore((state) => state.selectedregion);
  const setselectedregion = useStore((state) => state.setselectedregion);

  const setScale = useStore((state) => state.setScale);
  const { stageRef, _ } = useContext(StageContext);
  const stageScale = useStore((state) => state.stageScale);
  const load_scale = (stageRef, stageScale) => {
    /**
     * Loads the specified scaling properties onto a Konva stage.
     * Updates the stage's position and scale based on the provided stageScale object.
     *
     * @function
     * @param {object} stageRef - Reference to the Konva stage object.
     * @param {object} stageScale - Object containing the scale properties (x, y, scaleX, scaleY).
     * @returns {void}
     */
    stageRef.current.x(stageScale.x);
    stageRef.current.y(stageScale.y);
    stageRef.current.scaleX(stageScale.scaleX);
    stageRef.current.scaleY(stageScale.scaleY);
  };
  React.useEffect(() => {
    if (gridsize === 1) {
      function checkSize() {
        const container = document.querySelector(".right-panel");
        setSize({
          width: container.offsetWidth * 0.92,
          height,
        });
      }
      checkSize();
      window.addEventListener("resize", checkSize);
      load_scale(stageRef, stageScale);
      return () => window.removeEventListener("resize", checkSize);
    }
  }, []);

  return (
    <React.Fragment>
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        scaleX={scale}
        scaleY={scale}
        className="canvas"
        onClick={(e) => {
          const clickedNotOnRegion = e.target.name() !== "region";
          if (clickedNotOnRegion) {
            selectedRegions.clear();
          } else {
            selectedRegions.clear();
            if (e.target.closed()) {
              if (selectedRegions.has(e.target.id())) {
                selectedRegions.delete(e.target.id());
              } else {
                selectedRegions.add(e.target.id());
              }
            }
          }
          let current_regions_dict = { ...regionsdict };
          let current_regions = current_regions_dict[currimageid];

          current_regions.forEach((region) => {
            if (region.id === e.target.id()) {
              setselectedregion(region);
            }
          });
          setSelectedRegions(selectedRegions);
        }}
        onWheel={(e) => {
          e.evt.preventDefault();
          const stage = stageRef.current;

          const dx = -e.evt.deltaX;
          const dy = -e.evt.deltaY;
          const pos = limitAttributes(stage, {
            x: stage.x() + dx,
            y: stage.y() + dy,
            scale: stage.scaleX(),
          });
          stageRef.current.position(pos);
        }}
        onMouseDown={(e) => {
          e.evt.preventDefault();
        }}
        onMouseMove={(e) => {
          e.evt.preventDefault();
        }}
        onMouseUp={(e) => {
          e.evt.preventDefault();
        }}
      >
        <BaseImage imageURL={imageURL} stageRef={stageRef} />
        <Regions index={props.index} stageRef={stageRef} />
      </Stage>
    </React.Fragment>
  );
};
