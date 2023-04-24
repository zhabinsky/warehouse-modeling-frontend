import {
  AppBar,
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ContentCopy,
  DeleteOutline,
  Menu,
  Restore,
  ThreeDRotation,
  Undo,
  ZoomIn,
  ZoomOut,
} from "@mui/icons-material";
import { useState } from "react";

import { useTranslate } from "./useTranslate";
import { Shelf3D } from "./3d/Shelf3D";
import { useAtom } from "jotai";
import { atomSelectedTool } from "./state";
import { shelfToRectangles } from "./math/shelfToRectangles";
import { useStateUndo } from "./useStateUndo";
import { SideMenu } from "./components/SideMenu";
import { ShelfType, createShelf } from "./utils/createShelf";
import { Shelf2D } from "./Shelf/Shelf2D";

function App() {
  const [view3d, setView3d] = useState(true);

  const [shelf, setShelf, { undo, canUndo, resetStateAndHistory }] =
    useStateUndo<ShelfType>({
      ...createShelf(),
      shelves: [createShelf(), createShelf()],
    });

  const [selectedTool, setSelectedTool] = useAtom(atomSelectedTool);

  const { translate } = useTranslate();

  const rectangles = shelfToRectangles(shelf);

  const mapRecursive = (
    currentShelf: ShelfType,
    cb: (shelf: ShelfType) => ShelfType
  ): ShelfType => {
    const result = cb(currentShelf);

    if (result === currentShelf) {
      // hasn't modified
      return {
        ...result,
        shelves: currentShelf.shelves.map((shelf) => mapRecursive(shelf, cb)),
      };
    }

    return result;
  };

  const onClickShelf = (clickedShelf: ShelfType) => {
    let update;

    const findCurrentClickedShelf = (e: ShelfType) => e.id === clickedShelf.id;

    if (selectedTool === "add-sibling") {
      update = mapRecursive(shelf, (shelf) => {
        if (shelf.shelves.find(findCurrentClickedShelf)) {
          // we found parent

          return {
            ...shelf,
            shelves: [...shelf.shelves, createShelf()],
            meow: 1,
          };
        }

        return shelf;
      });
    } else if (selectedTool === "delete") {
      update = mapRecursive(shelf, (shelf) => {
        if (shelf.shelves.find(findCurrentClickedShelf)) {
          // we found parent

          const childrenShelvesUpdated = shelf.shelves.filter(
            (e) => e.id !== clickedShelf.id
          );

          if (childrenShelvesUpdated.length === 1) {
            return childrenShelvesUpdated[0];
          }

          return {
            ...shelf,
            shelves: childrenShelvesUpdated,
          };
        }

        return shelf;
      });
    } else if (selectedTool === "split-horizontal-2") {
      update = mapRecursive(shelf, (shelf) => {
        if (shelf.id === clickedShelf.id) {
          // we found parent

          return {
            ...shelf,
            shelves: [createShelf(), createShelf()],
            split: "horizontal",
          };
        }

        return shelf;
      });
    } else if (selectedTool === "split-horizontal-8") {
      update = mapRecursive(shelf, (shelf) => {
        if (shelf.id === clickedShelf.id) {
          // we found parent

          return {
            ...shelf,
            shelves: new Array(8).fill(null).map(createShelf),
            split: "horizontal",
          };
        }

        return shelf;
      });
    } else if (selectedTool === "split-vertical-2") {
      update = mapRecursive(shelf, (shelf) => {
        if (shelf.id === clickedShelf.id) {
          // we found parent

          return {
            ...shelf,
            shelves: [createShelf(), createShelf()],
            split: "vertical",
          };
        }

        return shelf;
      });
    } else if (selectedTool === "split-vertical-8") {
      update = mapRecursive(shelf, (shelf) => {
        if (shelf.id === clickedShelf.id) {
          // we found parent

          return {
            ...shelf,
            shelves: new Array(8).fill(null).map(createShelf),
            split: "vertical",
          };
        }

        return shelf;
      });
    } else if (selectedTool === "split-4") {
      update = mapRecursive(shelf, (shelf) => {
        if (shelf.id === clickedShelf.id) {
          // we found parent

          return {
            ...shelf,
            shelves: [
              {
                ...createShelf(),
                split: "horizontal",
                shelves: [createShelf(), createShelf()],
              },
              {
                ...createShelf(),
                split: "horizontal",
                shelves: [createShelf(), createShelf()],
              },
            ],
            split: "vertical",
          };
        }

        return shelf;
      });
    } else if (selectedTool === "split-16") {
      update = mapRecursive(shelf, (shelf) => {
        if (shelf.id === clickedShelf.id) {
          // we found parent

          return {
            ...shelf,
            shelves: [
              {
                ...createShelf(),
                split: "horizontal",
                shelves: [
                  {
                    ...createShelf(),
                    shelves: [
                      {
                        ...createShelf(),
                        split: "horizontal",
                        shelves: [createShelf(), createShelf()],
                      },
                      {
                        ...createShelf(),
                        split: "horizontal",
                        shelves: [createShelf(), createShelf()],
                      },
                    ],
                    split: "vertical",
                  },
                  {
                    ...createShelf(),
                    shelves: [
                      {
                        ...createShelf(),
                        split: "horizontal",
                        shelves: [createShelf(), createShelf()],
                      },
                      {
                        ...createShelf(),
                        split: "horizontal",
                        shelves: [createShelf(), createShelf()],
                      },
                    ],
                    split: "vertical",
                  },
                ],
              },
              {
                ...createShelf(),
                split: "horizontal",
                shelves: [
                  {
                    ...createShelf(),
                    shelves: [
                      {
                        ...createShelf(),
                        split: "horizontal",
                        shelves: [createShelf(), createShelf()],
                      },
                      {
                        ...createShelf(),
                        split: "horizontal",
                        shelves: [createShelf(), createShelf()],
                      },
                    ],
                    split: "vertical",
                  },
                  {
                    ...createShelf(),
                    shelves: [
                      {
                        ...createShelf(),
                        split: "horizontal",
                        shelves: [createShelf(), createShelf()],
                      },
                      {
                        ...createShelf(),
                        split: "horizontal",
                        shelves: [createShelf(), createShelf()],
                      },
                    ],
                    split: "vertical",
                  },
                ],
              },
            ],
            split: "vertical",
          };
        }

        return shelf;
      });
    } else if (selectedTool === "scale-cell-down") {
      update = mapRecursive(shelf, (shelf) => {
        if (shelf.id === clickedShelf.id) {
          // we found parent

          return {
            ...shelf,
            scale: shelf.scale * 0.8,
          };
        }

        return shelf;
      });
    } else if (selectedTool === "scale-cell-up") {
      update = mapRecursive(shelf, (shelf) => {
        if (shelf.id === clickedShelf.id) {
          // we found parent

          return {
            ...shelf,
            scale: shelf.scale * 1.2,
          };
        }

        return shelf;
      });
    } else {
      alert("Please select a tool first");
    }

    if (update) setShelf(update);
  };

  return (
    <>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            {translate("shelf.editingTitle")}
          </Typography>

          {/* <Chip label={shelf.id} color="info" sx={{ ml: 2 }} /> */}
        </Toolbar>
      </AppBar>

      <Stack spacing={2} py={2} px={{ xs: 2 }}>
        <Stack direction="row" spacing={3} justifyContent="center">
          <Stack
            alignItems="center"
            spacing={2}
            sx={{
              ".MuiIconButton-root": {
                width: 45,
                height: 45,
              },
              ".split-button": {
                transform: "scale(0.8)",
                fontSize: 14,
                fontWeight: "bold",
                width: 30,
              },
            }}
          >
            <SideMenu>
              {[
                {
                  toolName: "split-horizontal-2",
                  icon: <Box className="split-button">2x1</Box>,
                },
                {
                  toolName: "split-horizontal-8",
                  icon: <Box className="split-button">8x1</Box>,
                },
                {
                  toolName: "split-vertical-2",
                  icon: <Box className="split-button">1x2</Box>,
                },
                {
                  toolName: "split-vertical-8",
                  icon: <Box className="split-button">1x8</Box>,
                },
                {
                  toolName: "split-4",
                  icon: <Box className="split-button">2x2</Box>,
                },
                {
                  toolName: "split-16",
                  icon: <Box className="split-button">4x4</Box>,
                },

                {
                  toolName: "scale-cell-up",
                  icon: <ZoomIn />,
                },
                {
                  toolName: "scale-cell-down",
                  icon: <ZoomOut />,
                },
                {
                  toolName: "add-sibling",
                  icon: <ContentCopy />,
                },
                {
                  toolName: "delete",
                  icon: <DeleteOutline />,
                },
              ].map(({ icon, toolName }) => {
                const isSelected = toolName === selectedTool;

                return (
                  <Box key={toolName as any}>
                    <Tooltip
                      title={translate(`shelf.editAction.${toolName}` as any)}
                      disableInteractive
                      placement="right"
                    >
                      <IconButton
                        sx={{
                          background: isSelected
                            ? "lightblue !important"
                            : "transparent",
                          "&, *": {
                            transition: "none !important",
                          },
                        }}
                        onClick={() => setSelectedTool(toolName as any)}
                        color={isSelected ? "info" : undefined}
                      >
                        {icon}
                      </IconButton>
                    </Tooltip>
                  </Box>
                );
              })}
            </SideMenu>

            <SideMenu>
              <Tooltip
                title={translate("shelf.3dview")}
                disableInteractive
                placement="right"
              >
                <IconButton
                  color={view3d ? "info" : "default"}
                  onClick={() => setView3d(!view3d)}
                >
                  <ThreeDRotation />
                </IconButton>
              </Tooltip>
            </SideMenu>

            <Stack
              spacing={1}
              component={Paper}
              elevation={3}
              p={1}
              borderRadius={7}
            >
              <Box>
                <Tooltip
                  title={translate("shelf.undo")}
                  disableInteractive
                  placement="right"
                >
                  <IconButton onClick={undo} disabled={!canUndo}>
                    <Undo />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <IconButton
                  onClick={() => resetStateAndHistory?.()}
                  disabled={!canUndo}
                >
                  <Restore />
                </IconButton>
              </Box>
            </Stack>
          </Stack>

          <Box
            sx={{
              height: "calc(100vh - 30px)",
              maxWidth: "1800px",
              width: "100%",
            }}
          >
            {view3d ? (
              <Box sx={{ m: -2, height: "100%", zIndex: -1 }}>
                <Shelf3D rectangles={rectangles} onClickShelf={onClickShelf} />
              </Box>
            ) : (
              <Box
                sx={{
                  height: "calc(100% - 90px)",
                  maxHeight: "1000px",
                  width: "100%",
                  background: "lightgray",
                  p: "3px",
                }}
              >
                <Shelf2D shelf={shelf} onClickShelf={onClickShelf} />
              </Box>
            )}
          </Box>

          <Stack>
            <Stack
              spacing={1}
              component={Paper}
              elevation={3}
              p={1}
              borderRadius={6}
            >
              <Chip
                label={`${rectangles.length} cells`}
                variant="outlined"
                color="info"
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default App;

// {/* <pre>{JSON.stringify(shelf, null, 2)}</pre> */}
