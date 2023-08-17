import Product from '../models/Product.js';

const getAllProducts = async (req, res) => {
    const { company, featured, name, sort, field, numericFilter } = req.query;
    // featured is a string typeof(featured)
    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === 'true';
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }
    if (numericFilter) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<=)\b/g;
        let filters = numericFilter.replace(regEx, (match) => {
            return `-${operatorMap[match]}-`;
        });
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [fields, operator, value] = item.split('-');
            if (options.includes(fields)) {
                queryObject[fields] = { [operator]: Number(value) };
            }
        });
    }
    let result = Product.find(queryObject);

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        // First sorted by createdAt and then by _id
        result = result.sort('createdAt _id');
    }
    if (field) {
        const fieldsList = field.split(',').join(' ');
        result = result.select(fieldsList);
    }
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    const products = await result;

    if (products.length === 0) {
        return res.status(404).json({ msg: 'Products not found' });
    }
    res.status(200).json({ nbHits: products.length, products });
};

export default getAllProducts;
