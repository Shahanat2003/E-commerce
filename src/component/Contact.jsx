import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

function Contact() {
    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_nd4a7ok', 'template_lbv4xyp', form.current, {
        publicKey: 'ks-_sjRW2y0zGfqNE',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
      toast.success("message send succesfuly")
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-400 to-gray-300 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="user_name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none "
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="user_email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none "
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none "
              placeholder="Your Message"
              rows="5"
            />
          </div>
          <div>
            <input
              type="submit"
              value="Send"
              className="w-full bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
