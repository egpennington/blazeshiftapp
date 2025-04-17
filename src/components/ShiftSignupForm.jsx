import React from 'react'
import { useState } from "react"

function ShiftSignupForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        date: "",
        shiftBlock: "6am-6pm", // full day default
    })

    const handleChange = (e) => {
        const {name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form submitted: ", formData)

        // todo send data to firebase here

        setFormData({
            name: "",
            phone: "",
            date: "",
            shiftBlock: "6am-6pm"
        })
    }

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
                <select name="length" value={formData.length} onChange={handleChange}>
                    <option value="12pm-6pm" >6:00 am to 6:00 pm</option>
                    <option value="6am-12pm">6:00 am to 12:00 pm</option>
                    <option value="12pm-6pm">12:00 pm to 6:00 pm</option>                  
                </select>
            <p>By creating an account you agree to your <a href="#">Terms & Privacy</a></p>
            <button type="button" className="cancrelBtn" onClick={handleCancel}>Cancel</button>
            <button type="submit">Sign Up</button>
        </form>
    )
    
}

export default ShiftSignupForm