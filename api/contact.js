const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      from: 'Santa Mesa <hello@santamesa.dev>',
      to: 'hello@santamesa.dev',
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #080C14; color: #F8FAFC; padding: 40px; border-radius: 12px;">
          <div style="margin-bottom: 32px;">
            <img src="https://santamesa.dev/logo-light.png" alt="Santa Mesa" style="height: 60px; filter: brightness(0) invert(1);" />
          </div>
          <h2 style="color: #C4956A; margin-bottom: 24px;">New Website Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #1E2D45;">
              <td style="padding: 12px 0; color: #64748B; width: 120px;">Name</td>
              <td style="padding: 12px 0; color: #F8FAFC;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1E2D45;">
              <td style="padding: 12px 0; color: #64748B;">Email</td>
              <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #C4956A;">${email}</a></td>
            </tr>
            ${phone ? `<tr style="border-bottom: 1px solid #1E2D45;">
              <td style="padding: 12px 0; color: #64748B;">Phone</td>
              <td style="padding: 12px 0; color: #F8FAFC;">${phone}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 12px 0; color: #64748B; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #F8FAFC; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #1E2D45;">
            <a href="mailto:${email}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #C4956A, #A67850); color: #080C14; text-decoration: none; border-radius: 999px; font-weight: 600; font-size: 14px;">Reply to ${name}</a>
          </div>
          <p style="margin-top: 24px; color: #1E2D45; font-size: 12px;">Sent from santamesa.dev</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
