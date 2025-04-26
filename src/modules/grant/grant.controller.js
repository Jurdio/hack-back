const Grant = require('./grant.model');
const ApiError = require('../../common/exceptions/ApiError');
const { Op } = require('sequelize');

// Створити грант
const createGrant = async (req, res, next) => {
    try {
        const grant = await Grant.create(req.body);
        res.status(201).json(grant);
    } catch (error) {
        next(error);
    }
};

// Отримати всі гранти
const getAllGrants = async (req, res, next) => {
    try {
        const filters = {};

        if (req.query.foundation_name) {
            filters.foundation_name = { [Op.iLike]: `%${req.query.foundation_name}%` }; // нечутливий до регістру пошук
        }
        if (req.query.project_name) {
            filters.project_name = { [Op.iLike]: `%${req.query.project_name}%` };
        }
        if (req.query.cluster_name) {
            filters.cluster_name = { [Op.iLike]: `%${req.query.cluster_name}%` };
        }
        if (req.query.budget) {
            filters.budget = { [Op.iLike]: `%${req.query.budget}%` };
        }
        if (req.query.realization_start) {
            filters.realization_start = { [Op.gte]: new Date(req.query.realization_start) };
        }
        if (req.query.realization_end) {
            filters.realization_end = { [Op.lte]: new Date(req.query.realization_end) };
        }
        if (req.query.application_deadline) {
            filters.application_deadline = { [Op.lte]: new Date(req.query.application_deadline) };
        }

        const grants = await Grant.findAll({
            where: filters,
            order: [['createdAt', 'DESC']]
        });

        res.json(grants);
    } catch (error) {
        next(error);
    }
};

// Отримати грант по id
const getGrantById = async (req, res, next) => {
    try {
        const grant = await Grant.findByPk(req.params.id);

        if (!grant) {
            throw ApiError.notFound('Grant not found');
        }

        res.json(grant);
    } catch (error) {
        next(error);
    }
};

// Оновити грант
const updateGrant = async (req, res, next) => {
    try {
        const grant = await Grant.findByPk(req.params.id);

        if (!grant) {
            throw ApiError.notFound('Grant not found');
        }

        await grant.update(req.body);
        res.json(grant);
    } catch (error) {
        next(error);
    }
};

// Видалити грант
const deleteGrant = async (req, res, next) => {
    try {
        const grant = await Grant.findByPk(req.params.id);

        if (!grant) {
            throw ApiError.notFound('Grant not found');
        }

        await grant.destroy();
        res.json({ message: 'Grant deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createGrant,
    getAllGrants,
    getGrantById,
    updateGrant,
    deleteGrant,
};
