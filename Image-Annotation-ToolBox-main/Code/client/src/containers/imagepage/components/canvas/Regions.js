import React, { useContext } from "react";
import { Layer, Rect, Line, Group } from "react-konva";
import StageContext from "../../ContextProvider";
import useStore from "../../library/store";

let x = 0;
let y = 0;
let enclosing_rec = null;

export default function Regions(props) {
  const regions = useStore((s) => s.regions);
  const layerRef = React.useRef(null);

  const selectedId = useStore((s) => s.selectedRegionId);
  const selectRegion = useStore((s) => s.selectRegion);
  const fillinside = useStore((s) => s.fillinside);
  let flag = 0;
  if (fillinside == 1) {
    flag = 1;
  }
  const pointcolor = useStore((s) => s.pointcolor);
  const pointwidth = useStore((s) => s.pointwidth);
  const linewidth = useStore((s) => s.linewidth);
  const regionopacity = useStore((s) => s.regionopacity);

  const selectedRegions = useStore((s) => s.selectedRegions);
  const setSelectedRegions = useStore((s) => s.setSelectedRegions);
  const isMouseOverStartPoint = useStore(
    (state) => state.isMouseOverStartPoint
  );
  const setIsMouseOverStartPoint = useStore(
    (state) => state.setIsMouseOverStartPoint
  );
  const setRegions = useStore((s) => s.setRegions);
  const isDrawing = useStore((state) => state.isDrawing);

  const currimageid = useStore((state) => state.currimageid);
  const regionsdict = useStore((s) => s.regionsdict);
  const setregionsdict = useStore((s) => s.setregionsdict);
  const setcurrimageid = useStore((s) => s.setcurrimageid);

  let stageScale = useStore((s) => s.stageScale);
  const handleGroupDragStart = (e) => {
    /**
     * Event handler for the start of dragging a group. Records initial position and bounding box.
     *
     * @function
     * @param {Object} e - The Konva.js event object for drag start.
     * @returns {void}
     *
     * @example
     * // Example usage:
     * group.on('dragstart', handleGroupDragStart);
     */
    x = e.target.x();
    y = e.target.y();
    enclosing_rec = e.target.getClientRect();
  };
  const handleMouseOverStartPoint = (event) => {
    /**
     * Event handler for mouse over the starting point during drawing. Enlarges the point.
     *
     * @function
     * @param {Object} event - The Konva.js event object for mouse over.
     * @returns {void}
     *
     * @example
     * // Example usage:
     * startPoint.on('mouseover', handleMouseOverStartPoint);
     */
    if (!isDrawing) return;
    event.target.scale({ x: 2, y: 2 });
    setIsMouseOverStartPoint(1);
  };
  const handleMouseOutStartPoint = (event) => {
    /**
     * Event handler for mouse out from the starting point during drawing. Restores the point size.
     *
     * @function
     * @param {Object} event - The Konva.js event object for mouse out.
     * @returns {void}
     *
     * @example
     * // Example usage:
     * startPoint.on('mouseout', handleMouseOutStartPoint);
     */
    event.target.scale({ x: 1, y: 1 });
    setIsMouseOverStartPoint(0);
  };
  const handleGroupDragEnd = (e) => {
    /**
     * Event handler for the end of dragging a group. Adjusts the positions of points in the group.
     *
     * @function
     * @param {Object} e - The Konva.js event object for drag end.
     * @returns {void}
     *
     * @example
     * // Example usage:
     * group.on('dragend', handleGroupDragEnd);
     */
    // drag end listens other children circles' drag end event ...that's, why 'name' attr is added, see in polygon annotation part
    let temp_regions = [...regions];
    let target_region = temp_regions.splice(e.target.index, 1)[0];
    x -= e.target.x();
    y -= e.target.y();
    let points = target_region.points.map((point) => {
      return { ...{ x: point.x - x, y: point.y - y } };
    });
    points.map((point, index) => {
      target_region.points[index] = { ...point };
    });
    e.target.position({ x: 0, y: 0 });
    temp_regions.push(target_region);
    let regionsdict_copy = { ...regionsdict };
    regionsdict_copy[currimageid] = temp_regions;
    setregionsdict(regionsdict_copy);
    setRegions(temp_regions);
  };
  return (
    <Layer ref={layerRef}>
      {(regionsdict[props.index] ? regionsdict[props.index] : []).map(
        (region, index) => {
          const isSelected = selectedRegions.has(region.id);
          const flattenedPoints = region.points
            ? region.points.flatMap((p) => [p.x, p.y])
            : null;
          const flattened_cordinates = region.points
            ? region.points.flatMap((p) => [[p.x, p.y]])
            : null;
          return (
            <Group
              key={region.id}
              draggable={region.isComplete}
              onDragStart={handleGroupDragStart}
              onDragEnd={handleGroupDragEnd}
              dragBoundFunc={(pos) => {
                let stage = props.stageRef.current;
                let { x, y } = pos;
                const sw = stage.width();
                const sh = stage.height();
                let minMaxX = [
                  enclosing_rec.x,
                  enclosing_rec.x + enclosing_rec.width,
                ];
                let minMaxY = [
                  enclosing_rec.y,
                  enclosing_rec.y + enclosing_rec.height,
                ];
                if (minMaxY[0] + y < 0) y = -1 * minMaxY[0];
                if (minMaxX[0] + x < 0) x = -1 * minMaxX[0];
                if (minMaxY[1] + y > sh) y = sh - minMaxY[1];
                if (minMaxX[1] + x > sw) x = sw - minMaxX[1];
                return { x, y };
              }}
            >
              <Line
                globalCompositeOperation="destination-out"
                points={flattenedPoints}
                fill="black"
                listening={false}
                //closed
              />
              <Line
                name="region"
                id={region.id}
                points={flattenedPoints}
                fill={region.color}
                fillEnabled={flag}
                stroke={region.color}
                strokeWidth={linewidth}
                closed={region.isComplete}
                opacity={isSelected ? 1 : regionopacity}
              />
              {region.isEditable
                ? flattened_cordinates.map((point, index) => {
                    const width = 1;
                    const x = point[0] - width / 2;
                    const y = point[1] - width / 2;
                    const startPointAttr =
                      index === 0
                        ? {
                            hitStrokeWidth: 2,
                            onMouseOver: handleMouseOverStartPoint,
                            onMouseOut: handleMouseOutStartPoint,
                          }
                        : null;
                    return (
                      <Rect
                        key={index}
                        x={x}
                        y={y}
                        width={width}
                        height={width}
                        fill="white"
                        stroke={pointcolor}
                        strokeWidth={pointwidth}
                        {...startPointAttr}
                      />
                    );
                  })
                : null}
            </Group>
          );
        }
      )}
    </Layer>
  );
}
