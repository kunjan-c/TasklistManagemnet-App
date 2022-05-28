import React from "react";
import BasicCard from "../Component/UI/Card/BasicCard";
import BasicTextFields from "../Component/UI/InputTextField/BasicTextField";
import BasicButtons from "../Component/UI/Button/BasicButtons";
import { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { taskDataActions } from "../store";
import { useNavigate } from "react-router-dom";
import Tabular from "../Component/Tabular/Tabular";

let highestTaskId = 1; // for Task Id Updation

export default function CreateTaskForm() {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStartTime, setTaskStartTime] = useState(0);
  const [taskEndTime, setTaskEndTime] = useState(0);
  const [taskStatus, setTaskStatus] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    let currentTime = new Date().toLocaleTimeString();
    if (taskStartTime > currentTime) {
      setTaskStatus("Scheduled");
    } else if (taskStartTime < currentTime && taskEndTime > currentTime) {
      setTaskStatus("Running");
    } else if (taskEndTime < currentTime) {
      setTaskStatus("Expired");
    }
  }, [taskStatus, setTaskStatus, taskStartTime, taskEndTime]);

  const nameChangeHandler = (event) => {
    setTaskName(event.target.value);
  };
  const discriptionChangeHandler = (event) => {
    setTaskDescription(event.target.value);
  };
  const startTimeChangeHandler = (event) => {
    setTaskStartTime(event.target.value);
  };
  const endTimeChangeHandler = (event) => {
    setTaskEndTime(event.target.value);
  };

  const submitHandler = (e) => {
    dispatch(
      taskDataActions.createTask({
        name: taskName,
        description: taskDescription,
        startTime: taskStartTime,
        endTime: taskEndTime,
        id: highestTaskId,
        taskStatus: taskStatus,
      })
    );
    highestTaskId = highestTaskId + 1;
    navigate("/viewTasks");
  };

  return (
    <Fragment>
      <div>
        <Tabular></Tabular>
      </div>
      <BasicCard>
        <form>
          <BasicTextFields
            label="Task Name"
            size="normal"
            onChange={nameChangeHandler}
          ></BasicTextFields>
          <BasicTextFields
            label="Description"
            size="normal"
            onChange={discriptionChangeHandler}
          ></BasicTextFields>
          <BasicTextFields
            type="time"
            label="Start Time"
            size="normal"
            onChange={startTimeChangeHandler}
          ></BasicTextFields>
          <BasicTextFields
            type="time"
            label="End Time"
            size="normal"
            onChange={endTimeChangeHandler}
          ></BasicTextFields>
          <BasicButtons
            onClick={submitHandler}
            buttonName="Submit"
          ></BasicButtons>
        </form>
      </BasicCard>
    </Fragment>
  );
}
