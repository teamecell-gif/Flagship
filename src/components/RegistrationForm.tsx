import React, { useState } from "react";
import axios from "axios";
import CompletedRegistration from "./completedRegistration.jsx";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    collegeName: "",
  });

  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://flagship-backend-1.onrender.com/register",
        formData
      );

      if (response.status === 200) {
        console.log("Registration successful");
        setRegistrationComplete(true);
      } else {
        console.error("Registration failed");
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {registrationComplete ? (
        <CompletedRegistration />
      ) : (
        <div className="w-full">
          <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <img
                    src="/fsfs.png"
                    className="h-8 w-8 mr-2 sm:mr-3"
                    alt="Flagship Logo"
                  />
                  <span className="text-xl sm:text-2xl font-semibold text-gray-900">
                    flagship
                  </span>
                </div>
              </div>
            </div>
          </nav>

          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                Event Registration
              </h2>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Full Name"
                    required
                    className="block w-full px-3 py-2.5 rounded-md border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors sm:text-sm"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    required
                    className="block w-full px-3 py-2.5 rounded-md border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors sm:text-sm"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    required
                    className="block w-full px-3 py-2.5 rounded-md border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors sm:text-sm"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-2">
                    College Name
                  </label>
                  <select
                    id="collegeName"
                    name="collegeName"
                    className="block w-full px-3 py-2.5 rounded-md border border-gray-300 text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors sm:text-sm"
                    value={formData.collegeName}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select from below</option>
                    <option value="IIM Nagpur">IIM Nagpur</option>
                    <option value="AIIMS Nagpur">AIIMS Nagpur</option>
                    <option value="YCCE Nagpur">YCCE, Nagpur</option>
                    <option value="Cummins College, Nagpur">Cummins College, Nagpur</option>
                    <option value="SIT Nagpur">SIT, Nagpur</option>
                    <option value="GHRCE Nagpur">GHRCE, Nagpur</option>
                    <option value="IIIT Nagpur">IIIT, Nagpur</option>
                    <option value="NIT Nagpur">NIT, Nagpur</option>
                    <option value="Ramdeobaba">Ramdeobaba</option>
                    <option value="Govt Medical College">Govt Medical College, Nagpur</option>
                    <option value="Priyadarshini College">Priyadarshini College of Engineering</option>
                    <option value="others">Other</option>
                  </select>
                </div>

                <div className="pt-3 bg-blue-600 rounded-md hover:shadow-lg hover:bg-blue-700 transition-all duration-300">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center rounded-md bg-blue-600 text-white py-2"
                  >
                    {isSubmitting ? "Submitting..." : "Register Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
