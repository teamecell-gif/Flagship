import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",   // match backend: "college"
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const API_URL = "https://flagship-backend-1.onrender.com";
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
  const error = await response.json();
  alert(error.message || "Registration failed");
  return;
}

    // Get PDF as blob
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Open PDF in a new tab
    window.open(url, "_blank");

    // Trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Ticket.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();

  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed. Please try again.");
  } finally {
    setIsLoading(false);
  }

  setIsLoading(false);
};


  return (
    <div id="contact" className="h-full flex items-center justify-center">
      <div className="w-full max-w-[700px] px-5 py-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          Register <span className="text-blue-500">Here</span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full"
        >
          <div className="flex gap-x-6">
            <input
              type="text"
              placeholder="Full Name"
              className="input flex-1"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="input flex-1"
              name="phone"
              pattern="\d{10}"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <input
            type="email"
            placeholder="Email Address"
            className="input"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <select
            className="input text-gray-500"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
          >
            <option value="">Select College</option>
            <option value="VNIT Nagpur">VNIT Nagpur</option>
            <option value="IIM Nagpur">IIM Nagpur</option>
            <option value="AIIMS Nagpur">AIIMS Nagpur</option>
            <option value="YCCE Nagpur">YCCE Nagpur</option>
            <option value="Cummins College, Nagpur">Cummins College</option>
            <option value="SIT Nagpur">SIT Nagpur</option>
            <option value="GHRCE Nagpur">GHRCE Nagpur</option>
            <option value="IIIT Nagpur">IIIT Nagpur</option>
            <option value="NIT Nagpur">NIT Nagpur</option>
            <option value="Ramdeobaba">Ramdeobaba</option>
            <option value="Govt Medical College">Govt Medical College</option>
            <option value="Other">Other</option>
          </select>

          <button
            type="submit"
            className="btn btn-lg btn-blue w-full"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
