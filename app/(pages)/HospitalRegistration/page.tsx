import React from 'react';
import "@/app/styles/admin-dashboard.css"; 
import HospitalRegister from '../../actions/HospitalRegister';

export default function HospitalRegistration() {
  return (
    <div className="background min-h-screen flex items-center justify-center p-6"> 
      <form
        action={HospitalRegister}
        className="w-full max-w-xl bg-black text-white p-8 rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Hospital Registration</h2>

        <input
          type="text"
          name="name"
          placeholder="Hospital Name"
          className="w-full border border-gray-700 bg-black text-white rounded-md p-3" 
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border border-gray-700 bg-black text-white rounded-md p-3" 
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border border-gray-700 bg-black text-white rounded-md p-3" 
          required
        />


        <div className="flex gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-1/2 border border-gray-700 bg-black text-white rounded-md p-3" 
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            className="w-1/2 border border-gray-700 bg-black text-white rounded-md p-3" 
            required
          />
        </div>

        <input
          type="text"
          name="address"
          placeholder="Full Address"
          className="w-full border border-gray-700 bg-black text-white rounded-md p-3"
          required
        />

        <input
          type="text"
          name="contact"
          pattern="^[0-9]{10}$" 
          placeholder="Contact Info"
          className="w-full border border-gray-700 bg-black text-white rounded-md p-3" 
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Register Hospital
        </button>
      </form>
    </div>
  );
}
