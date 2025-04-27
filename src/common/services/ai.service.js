const { genAI } = require('../clients/gemini');

async function generateSummary(text) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Стисло і чітко сформулюй основну ідею наступного тексту за 500 символів:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return summary.trim();
}

module.exports = {
    generateSummary,
};
