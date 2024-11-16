export async function fetchEvents() {
      const response = await fetch('http://localhost:3000/events');

      if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status; //added response status to the error
        error.info = await response.json(); //added response info to the error
        throw error;
      }

      const { events } = await response.json();

      return events;
    }