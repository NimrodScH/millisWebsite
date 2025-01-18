"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("node:fs/promises"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const sendEmail = require('./email');
const generateEmailTemplate_1 = require("./generateEmailTemplate");
const app = (0, express_1.default)();
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.get('/', async (req, res) => {
    try {
        const filePath = path_1.default.join(__dirname, '../data/numbers-cards.json');
        const fileContent = await promises_1.default.readFile(filePath, 'utf8');
        const numbersCardsData = JSON.parse(fileContent);
        res.status(200).json({ numbersCards: numbersCardsData });
    }
    catch (error) {
        console.error('Error reading numbers file:', error);
        res.status(500).json({ message: 'Failed to load numbers.' });
    }
});
app.get('/about', async (req, res) => {
    try {
        const filePath = path_1.default.join(__dirname, '../data/about.json');
        const fileContent = await promises_1.default.readFile(filePath, 'utf8');
        const aboutData = JSON.parse(fileContent);
        res.status(200).json({ numbersCards: aboutData.numbersCards, keyPoints: aboutData.keyPoints });
    }
    catch (error) {
        console.error('Error reading numbers file:', error);
        res.status(500).json({ message: 'Failed to load numbers.' });
    }
});
app.get('/projects', async (req, res) => {
    try {
        const filePath = path_1.default.join(__dirname, '../data/projects.json');
        const fileContent = await promises_1.default.readFile(filePath, 'utf8');
        const projectsData = JSON.parse(fileContent);
        res.status(200).json({ projects: projectsData });
    }
    catch (error) {
        console.error('Error reading places file:', error);
        res.status(500).json({ message: 'Failed to load projects.' });
    }
});
app.get('/questions', async (req, res) => {
    try {
        const filePath = path_1.default.join(__dirname, '../data/QAData.json');
        const fileContent = await promises_1.default.readFile(filePath, 'utf8');
        const QAData = JSON.parse(fileContent);
        res.status(200).json({ questions: QAData });
    }
    catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ message: 'Failed to load q&a.' });
    }
});
app.get('/articles', async (req, res) => {
    try {
        const filePath = path_1.default.join(__dirname, '../data/articlesPageData.json');
        const fileContent = await promises_1.default.readFile(filePath, 'utf8');
        const articlesData = JSON.parse(fileContent);
        res.status(200).json({ articles: articlesData });
    }
    catch (error) {
        console.error('Error reading articles file:', error);
        res.status(500).json({ message: 'Failed to load articles.' });
    }
});
app.get(`/articles/:index`, async (req, res) => {
    try {
        const { index } = req.params;
        const filePath = path_1.default.join(__dirname, '../data/articles_data.json');
        const fileContent = await promises_1.default.readFile(filePath, 'utf8');
        const articleData = JSON.parse(fileContent);
        const article = articleData.find((a) => a.index.toString() === index);
        res.status(200).json(article);
    }
    catch (error) {
        console.error('Error reading articles file:', error);
        res.status(500).json({ message: 'Failed to load articles.' });
    }
});
app.put('/contact', async (req, res) => {
    const filePath = '../data/contact-form.json';
    let existingContacts;
    const { firstName, lastName, email, phone, contactingReason, acquisitionChannel, textBox, terms } = req.body;
    try {
        const fileContent = await promises_1.default.readFile(filePath, 'utf8');
        existingContacts = JSON.parse(fileContent);
        const { firstName, lastName, email: recipientEmail, phone, contactingReason, acquisitionChannel, textBox, terms } = req.body;
        const data = JSON.stringify(req.body, null, 2);
        await promises_1.default.writeFile(filePath, data);
        await sendEmail("plannersahead@gmail.com", "בקשה ליצירת קשר", "", (0, generateEmailTemplate_1.generateStyledEmailTemplate)(firstName, lastName, email, phone, contactingReason, acquisitionChannel, textBox));
        res.status(200).json({ message: 'User contact updated successfully!' });
    }
    catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
