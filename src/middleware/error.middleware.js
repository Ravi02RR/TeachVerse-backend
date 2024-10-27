function errorMiddleware(err, req, res, next) {
    if (err) {
        return res.status(500).json({
            message: "Something went wrong",
            data: err.message,
        });
    }
    next();
}