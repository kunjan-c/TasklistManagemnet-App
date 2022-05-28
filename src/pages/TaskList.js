import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import Tabular from "../Component/Tabular/Tabular";
import { useDispatch } from "react-redux";
import { taskDataActions } from "../store";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Fragment } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.data.collectedTaskData);
  const [tasksToDisplay, setTasksToDisplay] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState();

  const recordButtonPosition = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  let closeMenu = () => {
    setMenuOpen(false);
  };

  const sortByTitleAsc = () => {
    let filteredTasks = tasksToDisplay;
    filteredTasks = [...filteredTasks].sort(function (a, b) {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    setTasksToDisplay(filteredTasks);
    closeMenu();
  };

  const sortByTitleDesc = () => {
    let filteredTasks = tasksToDisplay;
    filteredTasks = [...filteredTasks].sort(function (a, b) {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    setTasksToDisplay(filteredTasks);
    closeMenu();
  };

  const sortByStatus = () => {
    let filteredTasks = [];
    let tasksSeperatedByStatus = {};
    for (var i = 0; i < tasksToDisplay.length; i++) {
      if (
        !tasksSeperatedByStatus.hasOwnProperty(tasksToDisplay[i].taskStatus)
      ) {
        tasksSeperatedByStatus[tasksToDisplay[i].taskStatus] = [];
      }
      tasksSeperatedByStatus[tasksToDisplay[i].taskStatus].push(
        tasksToDisplay[i]
      );
    }
    for (var key in tasksSeperatedByStatus) {
      if (tasksSeperatedByStatus.hasOwnProperty(key)) {
        filteredTasks = filteredTasks.concat(tasksSeperatedByStatus[key]);
      }
    }
    setTasksToDisplay(filteredTasks);
    closeMenu();
  };

  const clearSort = () => {
    let filteredTasks = tasks;
    setTasksToDisplay(filteredTasks);
    closeMenu();
  };

  useEffect(() => {
    setTasksToDisplay(tasks);
  }, [tasks]);

  const deleteHandler = (taskId) => {
    dispatch(taskDataActions.deleteTask(taskId));
  };

  const onSearchBarKeyUp = (event) => {
    let filteredTasks = [];
    for (var i = 0; i < tasks.length; i++) {
      if (
        tasks[i].name.toLowerCase().includes(event.target.value.toLowerCase())
      ) {
        filteredTasks.push(tasks[i]);
      }
    }
    setTasksToDisplay(filteredTasks);
  };

  return (
    <Fragment>
      <div>
        <Tabular></Tabular>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "50px",
          }}
        >
          <div style={{ margin: "10px" }}>
            <React.Fragment>
              <Button
                onClick={recordButtonPosition}
                style={{
                  border: "2px solid white",
                  color: "white",
                  height: "47px",
                  backgroundColor: "#80A2F8",
                  marginRight: "10px",
                }}
              >
                SORT TASKS
              </Button>
              <Menu anchorEl={anchorEl} open={menuOpen} onClose={closeMenu}>
                <MenuItem onClick={sortByTitleAsc}>
                  {" "}
                  SORT BY TITLE ASC{" "}
                </MenuItem>
                <MenuItem onClick={sortByTitleDesc}>
                  {" "}
                  SORT BY TITLE DESC{" "}
                </MenuItem>
                <MenuItem onClick={sortByStatus}> SORT BY STATUS </MenuItem>
                <MenuItem onClick={clearSort}> Clear </MenuItem>
              </Menu>
            </React.Fragment>
          </div>
          <div
            style={{
              margin: "0px",
              marginTop: "10px",
              display: "flex",
              justifyContent: "right",
            }}
          >
            <label htmlFor="search">
              <input
                id="search"
                type="text"
                placeholder="Search by title"
                style={{
                  height: "38px",
                  width: "300px",
                  fontSize: "15px",
                }}
                onChange={onSearchBarKeyUp}
              />
            </label>
          </div>
        </div>
        <div>
          {
            <TableContainer
              style={{
                width: "auto",
                marginTop: "30px",
                marginLeft: "50px",
                marginRight: "50px",
              }}
              component={Paper}
            >
              {(tasksToDisplay.length && (
                <Table sx={{ minWidth: 400 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">
                        Task Name
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Description
                      </StyledTableCell>
                      <StyledTableCell align="center">Status</StyledTableCell>
                      <StyledTableCell align="center">Edit</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasksToDisplay.map((row, i, arry) => (
                      <TableRow
                        key={row.name}
                        id={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">{row.taskStatus}</TableCell>
                        <TableCell align="center">
                          {
                            <button
                              onClick={(e) => {
                                deleteHandler(row.id);
                              }}
                            >
                              Delete
                            </button>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )) || (
                <p style={{ textAlign: "center", fontSize: "25px" }}>
                  Please Add Task
                </p>
              )}
            </TableContainer>
          }
        </div>
      </div>
    </Fragment>
  );
}
