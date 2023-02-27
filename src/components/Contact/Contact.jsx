import React from 'react'
import './Contact.css'
import { AiFillFacebook, AiFillInstagram, AiFillMail } from 'react-icons/ai'

function Contact() {
  return (
    <section class='contact'>
        <div class='content'>
            <h1>Contact Us</h1>
            <p>contact us or give us feed back about your views or suggestion or any queries</p>
        </div>

        <div class='container'>
            <div class='contactInfo'>
                <div class='box'>
                    <div class='icon'><AiFillFacebook/></div>
                    <div class='text'>
                        <h3>Facebook</h3>
                        <p>Join us on facebook</p>
                    </div>
                </div>
                <div class='box'>
                    <div class='icon'><AiFillInstagram/></div>
                    <div class='text'>
                        <h3>Instagram</h3>
                        <p>Join us on Instagram</p>
                    </div>
                </div>
                <div class='box'>
                    <div class='icon'><AiFillMail/></div>
                    <div class='text'>
                        <h3> Mail</h3>
                        <p>Join on mail</p>
                    </div>
                </div>
            </div>
            <div class='contactForm'>
                <form method='POST' action='https://formspree.io/f/xleknrrk'>

                    <h2>Send Message</h2>
                    <div class='inputBox'>
                        <input type="text" name='Name' required="required"/>
                        <span>Full name</span>
                    </div>
                    <div class='inputBox'>
                        <input type="email" name='Email' required="required"/>
                        <span>Email</span>
                    </div>
                    <div class='inputBox'>
                        <textarea name='Description' required="required"></textarea>
                        <span>Send your message</span>
                    </div>
                    <div class='inputBox'>
                        <input type="submit" name='Submit' value='send'/> 
                    </div>  
                </form>
            </div>
        </div>
    </section>
  )
}

export default Contact
