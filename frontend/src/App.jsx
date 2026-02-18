import { useEffect, useState } from "react";

function App() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API = "http://localhost:8000/api/tickets/";

  const fetchTickets = async () => {
    try {
      setError(null);
      const res = await fetch(API);

      if (!res.ok) {
        throw new Error("Failed to fetch tickets");
      }

      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load tickets.");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const createTicket = async () => {
    if (!title || !description) {
      alert("Title and Description required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          category: "billing",
          priority: "low",
          status: "open",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create ticket");
      }

      setTitle("");
      setDescription("");
      fetchTickets();
    } catch (err) {
      console.error(err);
      alert("Error creating ticket");
    }

    setLoading(false);
  };

  const deleteTicket = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API}${id}/`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      fetchTickets();
    } catch (err) {
      console.error(err);
      alert("Error deleting ticket");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "750px",
          backgroundColor: "#1f2937",
          padding: "40px",
          borderRadius: "14px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
          color: "white",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "35px" }}>
          🎫 Support Ticket System
        </h1>

        {error && (
          <div
            style={{
              backgroundColor: "#b91c1c",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        <h2>Create Ticket</h2>

        <input
          placeholder="Enter Ticket Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Describe the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, height: "100px" }}
        />

        <button
          onClick={createTicket}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: loading ? "#555" : "#4CAF50",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          {loading ? "Creating..." : "Create Ticket"}
        </button>

        <hr style={{ margin: "40px 0", borderColor: "#444" }} />

        <h2>All Tickets</h2>

        {tickets.length === 0 && !error && (
          <p style={{ marginTop: "20px", opacity: 0.7 }}>
            No tickets available.
          </p>
        )}

        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            style={{
              backgroundColor: "#111827",
              padding: "20px",
              marginTop: "18px",
              borderRadius: "10px",
              border: "1px solid #374151",
            }}
          >
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>

            <div style={{ marginTop: "10px" }}>
              <span style={badgeStyle("#ff9800")}>
                {ticket.status}
              </span>
              <span style={badgeStyle("#2196f3")}>
                {ticket.priority}
              </span>
              <span style={badgeStyle("#3b82f6")}>
                {ticket.category}
              </span>
            </div>

            <button
              onClick={() => deleteTicket(ticket.id)}
              style={{
                marginTop: "15px",
                padding: "8px 12px",
                backgroundColor: "#dc2626",
                border: "none",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #444",
  backgroundColor: "#111827",
  color: "white",
  outline: "none",
};

const badgeStyle = (color) => ({
  background: color,
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold",
  marginRight: "8px",
});

export default App;
