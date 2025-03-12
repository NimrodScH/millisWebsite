import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RootHeadline from "../pages/RootHeadline";

const textArray = [
  <RootHeadline 
    firstH1="מילי בן עזרא"
    secondH1="אדריכלות ובינוי ערים"
    firstSubtitle="מעל 25 שנים של תכנון פרוייקטים בכל סוגי התכנון"
    secondSubtitle="בניינים משותפים, בתים פרטיים, מבני ציבור והתחדשות עירונית"
  />,
  <RootHeadline 
    firstH1="יצירתיות ותכנון חכם"
    secondH1="תכנון ועיצוב מתקדם"
    firstSubtitle="פיתוח רעיונות חכמים ליצירתיות ותכנון ייחודי"
    secondSubtitle="מבנים אורבניים, בנייה פרטית, עיצוב סביבתי מתקדם"
  />,
  <RootHeadline
    firstH1="תכנון מדויק ומוקפד"
    secondH1="אדריכלות בהתאמה אישית"
    firstSubtitle="פיתוח חוויית מגורים תוך הקפדה על פונקציונליות"
    secondSubtitle="מגדלים מודרניים, בתי יוקרה, מבנים ציבוריים וחדשנות"
  />,
  <RootHeadline 
    firstH1="אסתטיקה ופרקטיקה"
    secondH1="תכנון בר-קיימא ומודרני"
    firstSubtitle="שימוש בחומרי גלם ירוקים לאיכות חיים וסביבה מתקדמת"
    secondSubtitle="בתים משותפים, מבנים חכמים, שטחים פתוחים מתוכננים היטב"
  />,
  <RootHeadline
    firstH1="אומנות ותכנון הנדסי"
    secondH1="אדריכלות עירונית חדשנית"
    firstSubtitle="שילוב של יופי, טכנולוגיה וקיימות למבנים חכמים"
    secondSubtitle="חללים ציבוריים, קמפוסים פרטיים, אזורי מסחר והתחדשות"
  />,
  <RootHeadline 
    firstH1="פונקציונליות עיצובית"
    secondH1="תכנון ועיצוב מתקדם"
    firstSubtitle="שילוב של תכנון מוקפד עם עיצוב המותאם אישית ללקוח"
    secondSubtitle="דירות יוקרה, מבני מגורים, סביבת עבודה וחללים מעוצבים"
  />
];  

const TextAnimation = () => {
  const [index, setIndex] = useState(0);
  const [isTabActive, setIsTabActive] = useState(true);
  let intervalRef:any = null;

  useEffect(() => {
    // פונקציה לבדיקת האם הטאב פעיל או לא
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!isTabActive) return; // אם הכרטיסייה לא פעילה, לא מתחילים טיימר

    intervalRef = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 7000); // שינוי טקסט כל 7 שניות

    return () => clearInterval(intervalRef);
  }, [isTabActive]); // מתבצע מחדש רק כאשר הכרטיסייה פעילה

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {textArray[index]}
      </motion.div>
    </AnimatePresence>
  );
};

export default TextAnimation;
