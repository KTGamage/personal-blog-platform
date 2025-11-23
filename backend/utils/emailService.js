const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter
transporter.verify((error) => {
  if (error) {
    console.log('Error with email configuration:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Send contact email
exports.sendContactEmail = async (contactData) => {
  try {
    const mailOptions = {
      from: contactData.email,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `New Contact Message from ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">New Contact Form Submission</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Subject:</strong> ${contactData.subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0ea5e9;">
              ${contactData.message}
            </div>
          </div>
          <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
            This message was sent from your blog platform contact form.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Message sent successfully' };
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw new Error('Failed to send message');
  }
};

// Send newsletter confirmation
exports.sendNewsletterConfirmation = async (email) => {
  try {
    const mailOptions = {
      from: process.env.NEWSLETTER_FROM_EMAIL,
      to: email,
      subject: 'Welcome to Our Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Welcome to Our Newsletter! 🎉</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
            <p>Thank you for subscribing to our newsletter! You'll now receive:</p>
            <ul>
              <li>Latest blog posts and updates</li>
              <li>Exclusive content and tips</li>
              <li>Community news and events</li>
            </ul>
            <p>We're excited to have you as part of our community!</p>
          </div>
          <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
            You can unsubscribe at any time by clicking the link in our emails.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Confirmation email sent' };
  } catch (error) {
    console.error('Error sending newsletter confirmation:', error);
    throw new Error('Failed to send confirmation email');
  }
};

// Send newsletter to subscribers
exports.sendNewsletter = async (subscribers, subject, content) => {
  try {
    const mailOptions = {
      from: process.env.NEWSLETTER_FROM_EMAIL,
      bcc: subscribers, // BCC to hide other subscribers' emails
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">${subject}</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
            ${content}
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 12px;">
              <a href="${process.env.CLIENT_URL}/unsubscribe" style="color: #64748b;">Unsubscribe</a> 
              from our newsletter
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Newsletter sent successfully' };
  } catch (error) {
    console.error('Error sending newsletter:', error);
    throw new Error('Failed to send newsletter');
  }
};