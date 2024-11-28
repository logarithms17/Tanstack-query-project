import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"; //is used to make a request to the server to create a new event
import { queryClient } from "../../util/http.js";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { createNewEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    //only be triggered when the form is submitted
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] }); // invalidate all queries
      navigate("/events"); // the page will be navigated only when the mutation is successful
    },
  });

  function handleSubmit(formData) {
    mutate(
      { event: formData } // {
      //   onSuccess: () => {
      //     alert("Event created successfully!");
      //   },
      //   onError: () => {
      //     alert("Failed to create the event.");
      //   },
      // }
    );
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && <p>Submitting...</p>}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={error.info?.message || "Failed to create event"} // if error.info.message exists, use it, otherwise use the default message
        />
      )}
    </Modal>
  );
}
