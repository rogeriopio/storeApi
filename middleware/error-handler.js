const errorHandleMiddleware = async (err, req, res, next) => {
    console.log(err);
    return res.status(500).json('Something went wrong, please try again');
};
export default errorHandleMiddleware;
