"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [seats, setSeats] = useState({ availableSeats: 0, totalSeats: 0 });
  const [seatsList, setSeatsList] = useState([]);
  const [numSeatsToBook, setNumSeatsToBook] = useState("");

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await axios.get(`https://workwise-backend-iota.vercel.app/seats`, {
        withCredentials: true,
      });
      setSeats({
        availableSeats: response?.data?.availableSeats,
        totalSeats: response?.data?.totalSeats,
      });
      setSeatsList(response?.data?.seats || []);
    } catch (error) {
      toast.error("Error fetching seat data. Please try again.");
    }
  };

  const handleBookSeats = async () => {
    if (!numSeatsToBook || isNaN(numSeatsToBook)) {
      toast.error("Please enter a valid number of seats.");
      return;
    }

    if (numSeatsToBook > 7) {
      toast.error("Cannot book more than 7 seats at a time.");
      return;
    }

    if (numSeatsToBook > seats.availableSeats) {
      toast.error(
        `Only ${seats.availableSeats} seats are available. Please adjust your booking.`
      );
      return;
    }
    setLoading(true)
    try {
      const response = await axios.post(
        `https://workwise-backend-iota.vercel.app/seats/reserve`,
        { numberOfSeats: parseInt(numSeatsToBook) },
        { withCredentials: true }
      );

      toast.success(response?.data?.message || "Seats booked successfully!");
      setNumSeatsToBook("");
      fetchSeats();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Error booking seats. Please try again."
      );
    } finally {
      setLoading(false)
    }
  };

  const handleResetBookings = async () => {
    try {
      const response = await axios.post(`https://workwise-backend-iota.vercel.app/seats/reset`, {
        withCredentials: true,
      });
      toast.success(response?.data?.message);
      fetchSeats();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Error booking seats. Please try again."
      );
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-bold text-lg">
          Available Seats: {seats.availableSeats}
        </h1>
        <h1 className="font-bold text-lg">Total Seats: {seats.totalSeats}</h1>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-7 gap-2">
          {seatsList.map((seat, index) => (
            <button
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-md text-white ${seat.isBooked ? "bg-red-500" : "bg-green-500"
                }`}
              disabled={seat.isBooked} // Disable booked seats
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input
          className="bg-gray-300 px-4 py-2 rounded-md w-[30vw] focus:outline-none"
          type="number"
          min="1"
          placeholder="Enter number of seats"
          value={numSeatsToBook}
          onChange={(e) => setNumSeatsToBook(e.target.value)}
        />
        {loading ? <button className="btn bg-blue-500 text-white px-2  rounded-md transition duration-300">
          <span className="loading loading-spinner"></span>
          loading
        </button> : <button
          onClick={handleBookSeats}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Book
        </button>}

        <button
          onClick={handleResetBookings}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Reset Bookings
        </button>
      </div>
    </div>
  );
}
