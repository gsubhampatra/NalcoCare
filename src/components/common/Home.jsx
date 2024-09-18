import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { heroImages } from '../../data/data'



const specialties = [
  { name: 'Cardiology', icon: '❤️' },
  { name: 'Neurology', icon: '🧠' },
  { name: 'Pediatrics', icon: '👶' },
  { name: 'Orthopedics', icon: '🦴' },
]

const testimonials = [
  { name: 'John Doe', text: 'NALCO Care has been a lifesaver. Quick appointments and great doctors!' },
  { name: 'Jane Smith', text: 'I love how easy it is to book appointments. The doctors are very professional.' },
]

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-96">
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image.img}
            alt={image.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl fade-up">Welcome to NALCO Care</h1>
            <p className="mb-8 text-xl text-white md:text-2xl fade-up">Your Health, Our Priority</p>
            <Link
              to="/"
              className="px-4 py-2 text-lg font-bold text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-600"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white fade-up">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">About NALCO Care</h2>
          <p className="max-w-3xl mx-auto text-lg text-center text-gray-700">
            NALCO Care is a state-of-the-art healthcare facility dedicated to providing exceptional medical services to
            our community. With a team of experienced doctors and cutting-edge technology, we ensure the best care for
            our patients.
          </p>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 bg-gray-100">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">Our Specialties</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {specialties.map((specialty, index) => (
              <div key={index} className="p-6 text-center bg-white rounded-lg shadow-md">
                <div className="mb-4 text-4xl">{specialty.icon}</div>
                <h3 className="text-xl font-semibold">{specialty.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 text-white bg-blue-500">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">What Our Patients Say</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 bg-white rounded-lg bg-opacity-10">
                <p className="mb-4 text-lg">"{testimonial.text}"</p>
                <p className="font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-xl text-gray-700">Book your appointment today and take the first step towards better health.</p>
          <Link
            to="/appointment"
            className="px-8 py-3 text-lg font-bold text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-600"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-white bg-gray-800">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xl font-semibold">NALCO Care</h3>
              <p>Your trusted healthcare partner</p>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>
              <ul>
                <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
                <li><Link to="/about" className="hover:text-blue-300">About</Link></li>
                <li><Link to="/services" className="hover:text-blue-300">Services</Link></li>
                <li><Link to="/contact" className="hover:text-blue-300">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold">Contact Us</h3>
              <p>123 Healthcare Street</p>
              <p>Bhubaneswar, Odisha 751001</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@nalcocare.com</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 NALCO Care. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home