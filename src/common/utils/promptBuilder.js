function buildSearchPrompt(formInputs, summary) {
    return `
Назва проєкту: ${formInputs.projectName || '-'}
Бюджет: ${formInputs.projectBudget || '-'}
Опис проєкту: ${formInputs.projectDescription || '-'}
Потенційні грантодавці: ${formInputs.grantSearch || '-'}
Категорія проєкту: ${formInputs.projectCategory || '-'}
Тривалість: ${formInputs.projectDuration || '-'}
Вплив проєкту: ${formInputs.projectImpact || '-'}
Інноваційність: ${formInputs.projectInnovation || '-'}
Відповідність стандартам: ${formInputs.projectCompliance || '-'}

Коротке саммарі з доданого файлу:
${summary}
`;
}

module.exports = {
    buildSearchPrompt,
};
