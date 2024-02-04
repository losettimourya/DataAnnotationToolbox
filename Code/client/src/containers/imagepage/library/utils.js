
function limitAttributes(stage, newAttrs) {
    const padding = 0;
    const box = stage.findOne('Image').getClientRect();
    const minX = -box.width + stage.width() -padding ;
    const maxX =  padding;
  
    const x = Math.max(minX, Math.min(newAttrs.x, maxX));
  
    const minY = -box.height + stage.height() -padding;
    const maxY =  padding;
  
    const y = Math.max(minY, Math.min(newAttrs.y, maxY));
  
    const scale = Math.max(0.05, newAttrs.scale);
  
    return { x, y, scale };
}

function getRelativePointerPosition(node) {
    const transform = node.getAbsoluteTransform().copy();
    transform.invert();
    const pos = node.getStage().getPointerPosition();
    return transform.point(pos);
}

export {limitAttributes,getRelativePointerPosition}