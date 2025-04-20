import React from 'react'
import { useState } from "react"
import { db, functions } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase";

import { messaging } from "../firebase";
import { getToken } from "firebase/messaging";

const vapidKey = "BCGNce0TKYPnWXcRL_ZMxvk_UkZE1eJ27_I02-xq8c9JTj3Vgoslza3-iLnbMgn6f1f1p3Ufhle5CI00UJmaE30"; // got this from project settings>cloudmessaging>webpushcert>keypair


function ShiftSignupForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        date: "",
        block: "6am-6pm" // full day for default
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
      
        console.log("Querying for:");
        console.log("Date:", formData.date.trim());
        console.log("Block:", formData.block.trim().toLowerCase());
      
        try {
          // Check if this shift already has 3 signups
          const q = query(
            collection(db, "shifts"),
            where("date", "==", formData.date.trim()),
            where("block", "==", formData.block.trim().toLowerCase())
          );
      
          const querySnapshot = await getDocs(q);
          console.log("Matched shifts:", querySnapshot.size);
      
          if (querySnapshot.size >= 3) {
            alert("This shift is already full.");
            return;
          }

          const vapidKey = "BCGNce0TKYPnWXcRL_ZMxvk_UkZE1eJ27_I02-xq8c9JTj3Vgoslza3-iLnbMgn6f1f1p3Ufhle5CI00UJmaE30"; // this is my FCM key

          const fcmToken = await getToken(messaging, { vapidKey });

          if (!fcmToken) {
            console.warn("❌ No FCM token available.");
          } else {
            console.log("📲 FCM Token:", fcmToken);
          }
      
          // Add new shift to Firestore
          await addDoc(collection(db, "shifts"), {
            name: formData.name,
            phone: formData.phone,
            date: formData.date.trim(),
            block: formData.block.trim().toLowerCase(),
            token: fcmToken || "no-token",
            timestamp: Date.now()
          });

          await fetch("https://us-central1-blazeshiftapp.cloudfunctions.net/sendPush", {
            method: "POST",
            body: JSON.stringify({
              token: fcmToken,
              name: formData.name,
              block: formData.block,
              date: formData.date
            }),
            headers: {
              "Current-Type": "application/json"
            }
          })
      
          alert("Shift signup successful!");
      
          // Reset form
          setFormData({
            name: "",
            phone: "",
            date: "",
            block: "6am-6pm"
          });
      
        } catch (err) {
          console.error("Error adding shift:", err.message);
          alert("Something went wrong. Check the console.");
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
      <>
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
        <footer className="footer">PenningtonProgramming &copy; 2025</footer>
      </>        
    )    
}

export default ShiftSignupForm