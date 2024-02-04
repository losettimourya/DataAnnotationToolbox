import React from "react";
import Konva from "konva";
import { Stage } from "react-konva";
import { v4 as uuid } from "uuid";
import Regions from "../Regions";
import BaseImage from "../BaseImage";
import { useContext } from "react";
import StageContext from "../../../ContextProvider";
import useStore from "../../../library/store";
import {
  limitAttributes,
  getRelativePointerPosition,
} from "../../../library/utils";
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
  const currimageid = useStore((state) => state.currimageid);
  const regionsdict = useStore((s) => s.regionsdict);
  const setregionsdict = useStore((s) => s.setregionsdict);

  let isMouseOverStartPoint = 0;
  const currStart = useStore((state) => state.currStart);
  const setCurrStart = useStore((state) => state.setCurrStart);

  const region_color = useStore((state) => state.color);

  const setScale = useStore((state) => state.setScale);
  const selectRegion = useStore((s) => s.selectRegion);
  const gridsize = useStore((state) => state.gridsize);
  const setgridsize = useStore((state) => state.setgridsize);
  const selectedRegions = useStore((s) => s.selectedRegions);
  const setSelectedRegions = useStore((s) => s.setSelectedRegions);
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
  const selectedregion = useStore((state) => state.selectedregion);
  const setselectedregion = useStore((state) => state.setselectedregion);

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
  const { stageRef, _ } = useContext(StageContext);
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
          setSelectedRegions(selectedRegions);
          if (clickedNotOnRegion || isDrawing) {
            const point = getRelativePointerPosition(e.target.getStage());
            if (!isDrawing || currStart == null) {
              toggleDrawing(true);
              setCurrStart(point);
              isMouseOverStartPoint = 0;

              const region = {
                id: uuid(),
                isComplete: false,
                isEditable: true,
                color: "#000000",
                points: [point],
                label: null,
                comment: "",
              };
              let regionsdict_copy = { ...regionsdict };
              regionsdict_copy[currimageid] = regions.concat([region]);
              setregionsdict(regionsdict_copy);
              setRegions(regions.concat([region]));
              setselectedregion(region);
              selectedRegions.add(region.id);
              setSelectedRegions(selectedRegions);
            } else {
              const lastRegion = { ...regions[regions.length - 1] };
              const rectangle_points = [
                {
                  x: currStart.x,
                  y: currStart.y,
                },
                {
                  x: point.x,
                  y: currStart.y,
                },
                {
                  x: point.x,
                  y: point.y,
                },
                {
                  x: currStart.x,
                  y: point.y,
                },
                {
                  x: currStart.x,
                  y: currStart.y,
                },
              ];

              lastRegion.points = rectangle_points;

              regions.splice(regions.length - 1, 1);

              lastRegion.isComplete = true;
              toggleDrawing(false);
              setCurrStart(null);
              let regionsdict_copy = { ...regionsdict };
              regionsdict_copy[currimageid] = regions.concat([lastRegion]);
              setregionsdict(regionsdict_copy);
              setRegions(regions.concat([lastRegion]));
              setselectedregion(lastRegion);
              selectedRegions.add(lastRegion.id);
              setSelectedRegions(selectedRegions);
            }
          }
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
        onMouseMove={(e) => {
          if (!isDrawing || currStart == null) {
            return;
          }

          const point = getRelativePointerPosition(e.target.getStage());

          const lastRegion = { ...regions[regions.length - 1] };
          const rectangle_points = [
            {
              x: currStart.x,
              y: currStart.y,
            },
            {
              x: point.x,
              y: currStart.y,
            },
            {
              x: point.x,
              y: point.y,
            },
            {
              x: currStart.x,
              y: point.y,
            },
            {
              x: currStart.x,
              y: currStart.y,
            },
          ];

          lastRegion.points = rectangle_points;
          let regions_copy = [...regions];
          regions_copy.splice(regions_copy.length - 1, 1);
          let regionsdict_copy = { ...regionsdict };
          regionsdict_copy[currimageid] = regions_copy.concat([lastRegion]);
          setregionsdict(regionsdict_copy);
          setRegions(regions_copy.concat([lastRegion]));
          setselectedregion(lastRegion);
        }}
      >
        <BaseImage imageURL={imageURL} stageRef={stageRef} />
        <Regions index={props.index} stageRef={stageRef} />
      </Stage>
    </React.Fragment>
  );
};
