import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
const sendEmail = require('./email');
import { generateStyledEmailTemplate } from './generateEmailTemplate';

const app = express();

// Serve static files from 'dist/public'
app.use(express.static(path.join(__dirname,'../public')));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// CORS headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Route: Serve index.html for the frontend
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API Routes (Prefixed with /api)

app.get('/api/home', async (req: Request, res: Response) => {
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


// Route: Get numbers-cards data
app.get('/api/numbers-cards', async (req: Request, res: Response) => {
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

// Route: Get about data
app.get('/api/about', async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, '../data/About.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const aboutData = JSON.parse(fileContent);

    res.status(200).json({ numbersCards: aboutData.numbersCards, keyPoints: aboutData.keyPoints });
  } catch (error) {
    console.error('Error reading about file:', error);
    res.status(500).json({ message: 'Failed to load about data.' });
  }
});

// Route: Get projects data
app.get('/api/projects', async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, '../data/projects.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const projectsData = JSON.parse(fileContent);

    res.status(200).json({ projects: projectsData });
  } catch (error) {
    console.error('Error reading projects file:', error);
    res.status(500).json({ message: 'Failed to load projects.' });
  }
});

// Route: Get questions and answers
app.get('/api/questions', async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, '../data/QAData.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const QAData = JSON.parse(fileContent);

    res.status(200).json({ questions: QAData });
  } catch (error) {
    console.error('Error reading Q&A file:', error);
    res.status(500).json({ message: 'Failed to load Q&A.' });
  }
});

// Route: Get articles list
app.get('/api/articles', async (req: Request, res: Response) => {
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

// Route: Get a specific article by index
app.get('/api/articles/:index', async (req: Request, res: Response) => {
  try {
    const { index } = req.params;
    const filePath = path.join(__dirname, '../data/articles_data.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const articleData = JSON.parse(fileContent);
    const article = articleData.find((a: any) => a.index.toString() === index);

    res.status(200).json(article);
  } catch (error) {
    console.error('Error reading article file:', error);
    res.status(500).json({ message: 'Failed to load article.' });
  }
});

// Route: Update contact form data
app.put('/api/contact', async (req: Request, res: Response) => {
  const filePath = path.join(__dirname, '../data/contact-form.json');
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

// Serve frontend for all undefined routes
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
