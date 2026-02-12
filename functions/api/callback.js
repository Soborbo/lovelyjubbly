// Simple in-memory rate limiting (per Cloudflare Worker instance)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5; // max 5 submissions per IP per hour

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  // Reset window if expired
  if (now - record.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  record.count++;
  return record.count > RATE_LIMIT_MAX_REQUESTS;
}

// Validate Cloudflare Turnstile token
async function verifyTurnstile(token, ip, secretKey) {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: secretKey,
      response: token,
      remoteip: ip,
    }),
  });

  const result = await response.json();
  return result.success === true;
}

// Basic input sanitisation
function sanitize(str, maxLength = 500) {
  if (!str) return '';
  return String(str).trim().slice(0, maxLength);
}

function isValidPhone(phone) {
  // Allow digits, spaces, +, -, (, ) — between 7 and 20 chars
  return /^[\d\s+\-()]{7,20}$/.test(phone);
}

export async function onRequestPost(context) {
  try {
    const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown';

    // Rate limiting check
    if (isRateLimited(ip)) {
      return new Response('Too many requests. Please try again later.', { status: 429 });
    }

    const formData = await context.request.formData();

    // Check honeypot field
    const honeypot = formData.get('website');
    if (honeypot) {
      // Bot detected, silently reject
      return Response.redirect(new URL('/contact/?success=true', context.request.url), 303);
    }

    // Verify Cloudflare Turnstile CAPTCHA
    const turnstileToken = formData.get('cf-turnstile-response');
    const turnstileSecret = context.env.TURNSTILE_SECRET_KEY;

    if (turnstileSecret) {
      if (!turnstileToken) {
        return new Response('CAPTCHA verification required. Please complete the challenge.', { status: 400 });
      }

      const turnstileValid = await verifyTurnstile(turnstileToken, ip, turnstileSecret);
      if (!turnstileValid) {
        return new Response('CAPTCHA verification failed. Please try again.', { status: 403 });
      }
    }

    // Extract and sanitise form data
    const name = sanitize(formData.get('name'), 100);
    const phone = sanitize(formData.get('phone'), 20);
    const email = sanitize(formData.get('email'), 254);
    const callbackTime = sanitize(formData.get('callback_time'), 50);
    const message = sanitize(formData.get('message'), 2000);
    const utmSource = sanitize(formData.get('utm_source'), 50);
    const utmMedium = sanitize(formData.get('utm_medium'), 50);

    // Validate required fields
    if (!name || !phone) {
      return new Response('Name and phone are required', { status: 400 });
    }

    // Validate phone format
    if (!isValidPhone(phone)) {
      return new Response('Please provide a valid phone number', { status: 400 });
    }

    // Send email via Resend (if API key is configured)
    const resendApiKey = context.env.RESEND_API_KEY;

    if (resendApiKey) {
      const emailBody = `
New callback request from Lovely Jubbly Removals website:

Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}
Preferred callback time: ${callbackTime}
Message: ${message || 'No message'}

UTM Source: ${utmSource}
UTM Medium: ${utmMedium}

IP Address: ${ip}

This enquiry came from lovelyjubblyremovals.co.uk
      `.trim();

      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Lovely Jubbly Website <hello@lovelyjubblyremovals.co.uk>',
            to: ['hello@painlessremovals.com'],
            subject: `Callback Request: ${name} - ${phone}`,
            text: emailBody,
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error('Resend API error:', response.status, errorData);
        } else {
          console.log('Email sent successfully');
        }
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }
    }

    // Redirect to success page
    return Response.redirect(new URL('/contact/?success=true', context.request.url), 303);

  } catch (error) {
    console.error('Form submission error:', error);
    return new Response('An error occurred. Please call us directly on 01172 870 082.', {
      status: 500
    });
  }
}

// Handle other methods
export async function onRequest(context) {
  if (context.request.method === 'POST') {
    return onRequestPost(context);
  }
  return new Response('Method not allowed', { status: 405 });
}
