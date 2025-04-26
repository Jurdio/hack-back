const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

async function parseFile(buffer, mimetype) {
    if (mimetype === 'application/pdf') {
        const data = await pdfParse(buffer);
        return data.text;
    }

    if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const { value } = await mammoth.extractRawText({ buffer });
        return value;
    }

    if (mimetype.startsWith('text/')) {
        return buffer.toString('utf-8');
    }

    throw new Error('Unsupported file type for parsing');
}

module.exports = {
    parseFile,
};
