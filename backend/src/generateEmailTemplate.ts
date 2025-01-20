export function generateStyledEmailTemplate(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  contactingReason: string,
  acquisitionChannel: string,
  textBox: string
): string {
  return `
  <body>
<span style="opacity: 0"> {{ randomness }} </span>
    <div style="direction: rtl; text-align: right; font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; max-width: 600px; margin: auto;">
      <h2 style="color: #FF8C42; text-align: center; margin-bottom: 20px;">בקשה ליצירת קשר</h2>
      <p><strong>שם:</strong> ${firstName} ${lastName}</p>
      <p><strong>אימייל:</strong> <a href="mailto:${email}" style="color: #007BFF; text-decoration: none;">${email}</a></p>
      <p><strong>פלאפון:</strong> ${phone}</p>
      <p><strong>סיבת פנייה:</strong> ${contactingReason}</p>
      <p><strong>מאיפה הלקוח הגיע:</strong> ${acquisitionChannel}</p>
      <p><strong>מידע נוסף:</strong> ${textBox || "לא נמסר מידע נוסף"}</p>
      <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 20px;">
      <p style="font-size: 0.9em; color: #555; text-align: center;">הודעה זו נשלחה מהאתר שלך.</p>
    </div>
    <span style="opacity: 0"> {{ randomness }} </span>
</body>
  `;
}
