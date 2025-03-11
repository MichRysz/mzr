"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Pobieramy URL i klucz anonimowy z zmiennych środowiskowych
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Tworzymy instancję klienta Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    city: "",
    province: "",
    birthDate: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Używamy supabase.auth.signUp do rejestracji użytkownika,
    // przekazując dodatkowe dane w opcji "data"
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          city: formData.city,
          province: formData.province,
          birthDate: formData.birthDate,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      console.error("Error during sign up:", error);
    } else {
      setMessage("Rejestracja przebiegła pomyślnie! Sprawdź swój email w celu potwierdzenia.");
      console.log("User registered:", data);
    }
  };

  return (
    <div className=" flex justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-transparent p-8 rounded w-full max-w-md shadow-[6px_6px_12px_rgba(0,0,0,0.8)]"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Załóż konto</h1>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="password">
            Hasło:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="firstName">
            Imię:
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="lastName">
            Nazwisko:
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="city">
            Miasto:
          </label>
          <input
            id="city"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="province">
            Województwo:
          </label>
          <input
            id="province"
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white mb-1" htmlFor="birthDate">
            Data urodzenia:
          </label>
          <input
            id="birthDate"
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button 
  className="relative w-48 h-12 flex items-center justify-center 
             transition-transform duration-200 ease-in-out 
             text-white rounded-md 
             bg-gradient-to-tr from-[#bb0808] to-[#ff7878] 
             hover:from-[#ff7878] hover:to-[#bb0808] 
             shadow-[6px_6px_12px_rgba(0,0,0,0.8)] 
             hover:shadow-[10px_10px_18px_rgba(0,0,0,1)] 
             overflow-hidden group"
>
              <span className="relative z-10">Załóż konto</span>
              <span className="absolute z-0 left-[-70%] top-[-50%] w-[50px] h-[100px] bg-white bg-opacity-50 transform skew-x-[-15deg] transition-all duration-500 group-hover:left-[110%]"></span>
            </button>

        {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
      </form>
    </div>
  );
}
