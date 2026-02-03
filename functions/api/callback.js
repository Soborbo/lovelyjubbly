export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();

    // Check honeypot field
    const honeypot = formData.get('website');
    if (honeypot) {
      // Bot detected, silently reject
      return Response.redirect(new URL('/contact/?success=true', context.request.url), 303);
    }

    // Extract form data
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email') || '';
    const callbackTime = formData.get('callback_time') || 'Any time';
    const message = formData.get('message') || '';
    const utmSource = formData.get('utm_source') || '';
    const utmMedium = formData.get('utm_medium') || '';

    // Validate required fields
    if (!name || !phone) {
      return new Response('Name and phone are required', { status: 400 });
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

This enquiry came from lovelyjubblyremovals.co.uk
      `.trim();

      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Lovely Jubbly Website <noreply@lovelyjubblyremovals.co.uk>',
            to: ['hello@painlessremovals.com'],
            subject: `Callback Request: ${name} - ${phone}`,
            text: emailBody,
          }),
        });
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
