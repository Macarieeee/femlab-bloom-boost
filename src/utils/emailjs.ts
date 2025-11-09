// EmailJS integration helper
export const sendConfirmationEmail = async (
  email: string,
  name: string,
  serviceId: string,
  templateId: string,
  publicKey: string
) => {
  try {
    // Dynamically import emailjs
    const emailjs = await import("@emailjs/browser");

    const templateParams = {
      to_email: email,
      to_name: name,
      from_name: "FemLab",
      message: "Bine ai venit la masterclass!",
    };

    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);

    console.log("Email sent successfully:", response);
    return { success: true, response };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};
