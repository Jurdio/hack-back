const { openai } = require('../clients/openai');

async function generateSummary(text) {
    const prompt = `Стисло і чітко сформулюй основну ідею наступного тексту за 500 символів:\n\n${text}`;

    const response = await openai.createChatCompletion({
        model: 'gpt-4', // або gpt-3.5-turbo
        messages: [
            {
                role: 'user',
                content: prompt,
            },
        ],
        temperature: 0.5,
        max_tokens: 300,
    });

    return response.data.choices[0].message.content.trim();
}

module.exports = {
    generateSummary,
};
