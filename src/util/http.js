export async function fetchEvents({signal, searchTerm}) {
  console.log(searchTerm)
  let url = 'http://localhost:3000/events'
  
  if (searchTerm) {
    url = `http://localhost:3000/events?search=${searchTerm}`
  }
    const response = await fetch(url, {signal});

    if (!response.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status; //added response status to the error
      error.info = await response.json(); //added response info to the error
      throw error; //throwing the error
    }

    const { events } = await response.json();

    return events;
  }