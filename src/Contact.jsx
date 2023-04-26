import {useState} from 'react'
import emailjs, { init } from 'emailjs-com'
import './contact.css'
init('mqYD-62Ls3OIAGyTj');

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);


    const isValidEmail = email => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    };

    const submit = () => {
        if(!isValidEmail(email)) { setInvalidEmail(true)}
        else {
            if (name && email && message) {
                const serviceId = 'service_25g6p4h';
                const templateId = 'template_mgrdduq';
                const templateParams = {
                    name,
                    email,
                    message
                };

                emailjs.send(serviceId, templateId, templateParams)
                    .then(response => console.log(response))
                    .then(error => console.log(error));

                setName('');
                setEmail('');
                setMessage('');
                setEmailSent(true);
            } else {
                alert('Please fill in all fields.');
            }
        }
    }

    return (
        <>
            <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
            <span className={invalidEmail ? 'visible' : null}>Please insert a valid email adress</span>
            <textarea placeholder="Your message" value={message} onChange={e => setMessage(e.target.value)}></textarea>
            <button onClick={submit}>Send Message</button>
            <span className={emailSent ? 'visible' : null}>Thank you for your message, we will be in touch in no time!</span>
        </>
    );
};

export default Contact;