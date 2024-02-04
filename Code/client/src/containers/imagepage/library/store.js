import create from "zustand";

const [useStore] = create((set) => ({
  width: window.innerWidth,
  height: window.innerHeight,
  setSize: ({ width, height }) => set({ width, height }),

  imageWidth: 100, 
  imageHeight: 100,

  setImageSize: (size) =>
    set(() => ({ imageWidth: size.width, imageHeight: size.height })),
  scale: 0,
  setScale: (scale) => set({ scale }),

  isDrawing: false,
  toggleIsDrawing: (isDrawing) => set((state) => ({ isDrawing })),

  regions: [],
  setRegions: (regions) => set((state) => ({ regions })),

  prevregions: [],
  setprevRegions: (prevregions) => set((state) => ({ prevregions })),

  fillinside: 0,
  setFillinside: (fillinside) => set({ fillinside }),

  regionopacity: 0.3,
  setRegionopacity: (regionopacity) => set({ regionopacity }),

  pointwidth: 2,
  setPointwidth: (pointwidth) => set({ pointwidth }),

  linewidth: 3,
  setLinewidth: (linewidth) => set({ linewidth }),

  pointcolor: "black",
  setPointcolor: (pointcolor) => set({ pointcolor }),

  history: [],
  setHistory: (history) => set((state) => ({ history })),

  historySelected: [],
  setHistorySelected: (historySelected) =>
    set((state) => ({ historySelected })),

  isMouseOverStartPoint: 0,
  setIsMouseOverStartPoint: (isMouseOverStartPoint) =>
    set((state) => ({ isMouseOverStartPoint })),

  currStart: null,
  setCurrStart: (currStart) => set((state) => ({ currStart })),

  prevStart: null,
  setPrevStart: (prevStart) => set((state) => ({ prevStart })),

  selectedRegionId: null,
  selectRegion: (selectedRegionId) => set({ selectedRegionId }),

  tool: { id: 0 },
  setTool: (tool) => set({ tool }),

  checkList: [],
  setCheckList: (checkList) => set((state) => ({ checkList })),

  color: "black",
  setColor: (color) => set({ color }),

  dataset: "cancer",
  setDataset: (dataset) => set({ dataset }),

  server: "http://localhost:3031",
  setServer: (server) => set({ server }),

  labels: [],
  setLabels: (labels) => set((state) => ({ labels })),

  imageList: [],
  setImageList: (imageList) => set((state) => ({ imageList })),

  userList: [],
  setUserList: (userList) => set((state) => ({ userList })),

  currUser: "amey.choudhary@research.iiit.ac.in",
  setCurrUser: (currUser) => set({ currUser }),

  currImage: "black",
  setCurrImage: (currImage) => set({ currImage }),

  adminMode: false,
  setAdminMode: (adminMode) => set({ adminMode }),

  annotaionsList: [],
  setAnnotaionsList: (annotaionsList) => set((state) => ({ annotaionsList })),

  imageIndex: 0,
  setImageIndex: (index) => set((state) => ({ index })),

  selectedRegions: new Set(),
  setSelectedRegions: (selectedRegions) =>
    set((state) => new Set(selectedRegions)),

  screensize: 1,
  setscreensize: (screensize) => set({ screensize }),
  stageScale: {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
  },
  setStageScale: (stageScale) => set({ stageScale }),
 
  orignalScale: {},
  setOrignalScale: (orignalScale) => set({ orignalScale }),

  brightness: 0,
  setBrightness: (brightness) => set({ brightness }),

  fullscreen: 0,
  setfullscreen: (fullscreen) => set({ fullscreen }),

  hidelabelbox: 0,
  sethidelabelbox: (hidelabelbox) => set({ hidelabelbox }),

  gridsize: 1,
  setgridsize: (gridsize) => set({ gridsize }),

  gridview: [1, 1],
  setgridview: (gridview) => set({ gridview }),

  viewimage: null,
  setviewimage: (viewimage) => set({ viewimage }),

  gridimages: [],
  setgridimages: (gridimages) => set({ gridimages }),

  currimageid: 0,
  setcurrimageid: (currimageid) => set({ currimageid }),

  regionsdict: {},
  setregionsdict: (regionsdict) => set((state) => ({ regionsdict })),

  prevregionsdict: {},
  setprevregionsdict: (prevregionsdict) =>
    set((state) => ({ prevregionsdict })),

  selectedlabel: null,
  setselectedlabel: (selectedlabel) => set({ selectedlabel }),

  selectedregion: {},
  setselectedregion: (selectedregion) => set({ selectedregion }),

  showHideAnnotations: "Hide",
  setShowHideAnnotations: (showHideAnnotations) =>
    set((state) => ({ showHideAnnotations })),

  selectedCell: { row: 0, col: 0 },
  setSelectedCell: (selectedCell) => set((state) => ({ selectedCell })),

  tools: [
    {
      id: 0,
      label: "Arrow",
      type: "arrow",
      isHovering: false,
      iconimage: "./icons/cursor.svg",
    },
    {
      id: 1,
      label: "Polygon",
      type: "polygon",
      isHovering: false,
      iconimage: "./icons/polygon.svg",
    },
    {
      id: 2,
      label: "Custom",
      type: "custom",
      isHovering: false,
      iconimage: "./icons/custom.svg",
    },
    {
      id: 3,
      label: "Rectangle",
      type: "rectangle",
      isHovering: false,
      iconimage: "./icons/rectangle.svg",
    },
    {
      id: 4,
      label: "Drag",
      type: "dragMode",
      isHovering: false,
      iconimage: "./icons/drag.svg",
    },
    {
      id: 10,
      label: "Oval",
      type: "oval",
      isHovering: false,
      iconimage: "./icons/oval.svg",
    },
    {
      id: 9,
      label: "Circle",
      type: "circle",
      isHovering: false,
      iconimage: "./icons/circle.svg",
    },
    {
      id: 5,
      label: "Moderation",
      type: "moderation",
      isHovering: false,
      iconimage: "./icons/multi-select.svg",
    },
  ],
  setTools: (tools) => set((state) => ({ tools })),
}));

export default useStore;
