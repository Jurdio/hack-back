const { uploadFile } = require('../../common/services/s3.service');
const { parseFile } = require('../../common/utils/fileParser');
const { generateSummary } = require('../../common/utils/ai.service');
const { buildSearchPrompt } = require('../../common/utils/promptBuilder');

const handleGrantApplication = async (req, res, next) => {
    try {
        const formFields = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'Файл не прикріплено' });
        }

        // Заливаємо файл в S3
        const fileUrl = await uploadFile(file.buffer, file.originalname, file.mimetype);

        // Парсимо текст з буфера
        const parsedText = await parseFile(file.buffer, file.mimetype);

        // Генеруємо саммарі
        const summary = await generateSummary(parsedText);

        // Складаємо фінальний промт
        const prompt = buildSearchPrompt(formFields, summary);

        res.json({ summary, prompt, fileUrl });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleGrantApplication,
};
