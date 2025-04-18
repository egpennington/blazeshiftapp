import React from 'react'
import { useState } from "react"
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";



function ShiftSignupForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        date: "",
        block: "6am-6pm", // full day default
    })

    const handleChange = (e) => {
        const {name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          // Check if shift already has 3 signups
          const q = query(
            collection(db, "shifts"),
            where("date", "==", formData.date),
            where("block", "==", formData.block)
          );
          const querySnapshot = await getDocs(q);
      
          if (querySnapshot.size >= 3) {
            alert("This shift is already full (3 signups).");
            return;
          }
      
          // Add the new shift signup to Firestore
          await addDoc(collection(db, "shifts"), {
            name: formData.name,
            phone: formData.phone,
            date: formData.date,
            block: formData.block,
            timestamp: Date.now(),
          });
      
          alert("Shift signup successful!");
          setFormData({
            name: "",
            phone: "",
            date: "",
            block: "6am-12pm"
          });
        } catch (err) {
            console.error("Error adding shift:", err.message);
            alert("Something went wrong. Check the console for details.");
        }
    };

    const handleCancel = () => {
        setFormData({
            name: "",
            phone: "",
            date: "",
            shiftBlock: "6am-6pm" // full day is default
        })
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Shift Signup</h2>

            <label htmlFor="name">Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label htmlFor="phone">Phone Number:</label>
            <input tel="text" name="phone" value={formData.phone} onChange={handleChange} required />

            <label htmlFor="date">Shift Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />

            <label htmlFor="shiftBlock">Choose Shift:</label>            
                <select name="block" value={formData.block} onChange={handleChange}>
                    <option value="12pm-6pm" >6:00 am to 6:00 pm</option>
                    <option value="6am-12pm">6:00 am to 12:00 pm</option>
                    <option value="12pm-6pm">12:00 pm to 6:00 pm</option>                  
                </select>
            <p>By creating an account you agree to your <a href="#">Terms & Privacy</a></p>
            <button type="button" className="cancelBtn" onClick={handleCancel}>Cancel</button>
            <button type="submit">Sign Up</button>
        </form>
    )
    
}

export default ShiftSignupForm