const express = require('express');
const Newsletter = require('../models/Newsletter');
const { sendContactEmail, sendNewsletterConfirmation } = require('../utils/emailService');
const auth = require('../middleware/auth');
const router = express.Router();

// Contact form submission
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // Send email
    await sendContactEmail({ name, email, subject, message });

    res.json({ 
      success: true, 
      message: 'Message sent successfully! We\'ll get back to you soon.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Newsletter subscription
router.post('/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        message: 'Email is required' 
      });
    }

    // Check if already subscribed
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(400).json({ 
          message: 'This email is already subscribed to our newsletter' 
        });
      } else {
        // Reactivate subscription
        existingSubscriber.isActive = true;
        await existingSubscriber.save();
      }
    } else {
      // Create new subscription
      await Newsletter.create({ email });
    }

    // Send confirmation email
    try {
      await sendNewsletterConfirmation(email);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Continue even if confirmation email fails
    }

    res.json({ 
      success: true, 
      message: 'Successfully subscribed to our newsletter!' 
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ 
      message: 'Failed to subscribe. Please try again later.' 
    });
  }
});

// Newsletter unsubscribe
router.post('/newsletter/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        message: 'Email is required' 
      });
    }

    const subscriber = await Newsletter.findOne({ email });
    if (subscriber) {
      subscriber.isActive = false;
      await subscriber.save();
    }

    res.json({ 
      success: true, 
      message: 'You have been unsubscribed from our newsletter' 
    });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({ 
      message: 'Failed to unsubscribe. Please try again later.' 
    });
  }
});

// Get newsletter subscribers (protected route)
router.get('/newsletter/subscribers', auth, async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ isActive: true })
      .select('email subscribedAt')
      .sort({ subscribedAt: -1 });

    res.json({ 
      success: true, 
      subscribers,
      count: subscribers.length 
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch subscribers' 
    });
  }
});

// Send newsletter to all subscribers (protected route)
router.post('/newsletter/send', auth, async (req, res) => {
  try {
    const { subject, content } = req.body;

    if (!subject || !content) {
      return res.status(400).json({ 
        message: 'Subject and content are required' 
      });
    }

    const activeSubscribers = await Newsletter.find({ isActive: true });
    const subscriberEmails = activeSubscribers.map(sub => sub.email);

    if (subscriberEmails.length === 0) {
      return res.status(400).json({ 
        message: 'No active subscribers found' 
      });
    }

    // Send newsletter (in production, you might want to use a queue)
    await sendNewsletter(subscriberEmails, subject, content);

    res.json({ 
      success: true, 
      message: `Newsletter sent to ${subscriberEmails.length} subscribers` 
    });
  } catch (error) {
    console.error('Send newsletter error:', error);
    res.status(500).json({ 
      message: 'Failed to send newsletter' 
    });
  }
});

module.exports = router;