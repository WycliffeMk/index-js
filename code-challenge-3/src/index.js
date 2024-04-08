// Your code here
//GET
    fetch('http://localhost:3000/films/1')
    .then(res => {
        res.json()
    })
    .then(data => {
        const ticketsAvailable = data.capacity - data.tickets_sold;
        console.log('Movie Details:');
        console.log('Poster:', data.poster);
        console.log('Title:', data.title);
        console.log('Runtime:', data.runtime + ' minutes');
        console.log('Showtime:', data.showtime);
        console.log('Available Tickets:', ticketsAvailable);
    });

    fetch('/films')
    .then(response => response.json())
    .then(data => {
        const filmsList = document.getElementById('films');
        data.forEach(film => {
            const li = document.createElement('li');
            li.classList.add('film', 'item');
            li.textContent = film.title;
            filmsList.appendChild(li);
        });
    });


    // Buy a ticket for a movie. After clicking the "Buy Ticket" button, I should
    // see the number of available tickets decreasing on the frontend. I should not
    // be able to buy a ticket if the showing is sold out (if there are 0 tickets

    const purchaseTicket = async (filmId) => {
        const response = await fetch(`/films/${filmId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "tickets_sold": 28 })
        });

        const updatedFilm = await response.json();
        return updatedFilm;
    }

    // POST the new ticket to the tickets endpoint in the database

    // POST /tickets

    const postTicket = async (filmId, numberOfTickets) => {
        const response = await fetch(`/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "film_id": filmId, "number_of_tickets": numberOfTickets })
        });

        const newTicket = await response.json();
        return newTicket;
    }