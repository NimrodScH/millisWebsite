import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
const sendEmail = require('./email');
import { generateStyledEmailTemplate } from './generateEmailTemplate';


const app = express();


app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});



app.get('/', async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, '../data/numbers-cards.json');
const fileContent = await fs.readFile(filePath, 'utf8');
    const numbersCardsData = JSON.parse(fileContent);

    res.status(200).json({ numbersCards: numbersCardsData });
  } catch (error) {
    console.error('Error reading numbers file:', error);
    res.status(500).json({ message: 'Failed to load numbers.' });
  }
});



app.get('/about', async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, '../data/about.json');
const fileContent = await fs.readFile(filePath, 'utf8');
    const aboutData = JSON.parse(fileContent);

    res.status(200).json({numbersCards:aboutData.numbersCards, keyPoints: aboutData.keyPoints});
  } catch (error) {
    console.error('Error reading numbers file:', error);
    res.status(500).json({ message: 'Failed to load numbers.' });
  }
});



app.get('/projects', async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, '../data/projects.json');
const fileContent = await fs.readFile(filePath, 'utf8');
    const projectsData = JSON.parse(fileContent);

    res.status(200).json({ projects: projectsData });
  } catch (error) {
    console.error('Error reading places file:', error);
    res.status(500).json({ message: 'Failed to load projects.' });
  }
});



app.get('/questions', async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, '../data/QAData.json');
const fileContent = await fs.readFile(filePath, 'utf8');
    const QAData = JSON.parse(fileContent);

    res.status(200).json({ questions: QAData });
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ message: 'Failed to load q&a.' });
  }
});


app.get('/articles', async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, '../data/articlesPageData.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const articlesData = JSON.parse(fileContent);
      res.status(200).json({ articles: articlesData });
  } catch (error) {
      console.error('Error reading articles file:', error);
      res.status(500).json({ message: 'Failed to load articles.' });
  }
});


app.get(`/articles/:index`, async (req: Request, res: Response) => {
  try {
    const { index } = req.params;
    const filePath = path.join(__dirname, '../data/articles_data.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const articleData = JSON.parse(fileContent);
    const article = articleData.find((a: any) => a.index.toString() === index);


    res.status(200).json(article);
  } catch (error) {
    console.error('Error reading articles file:', error);
    res.status(500).json({ message: 'Failed to load articles.' });
  }
});



app.put('/contact', async (req: Request, res: Response) => {
  const filePath = '../data/contact-form.json';
  let existingContacts;
  const { firstName, lastName, email, phone, contactingReason, acquisitionChannel, textBox, terms } = req.body;

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    existingContacts = JSON.parse(fileContent)
    const { firstName, lastName, email: recipientEmail, phone, contactingReason, acquisitionChannel, textBox, terms } = req.body;
    
    const data = JSON.stringify(req.body, null, 2)
    await fs.writeFile(filePath, data );

    await sendEmail(
      "plannersahead@gmail.com",
      "בקשה ליצירת קשר",
      "",
      generateStyledEmailTemplate(firstName, lastName, email, phone, contactingReason, acquisitionChannel, textBox)    
  );
  


    res.status(200).json({ message: 'User contact updated successfully!' });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

