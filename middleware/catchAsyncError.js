module.exports = ErrorFunction => ( req, res, next ) => {
    Promise.resolve(ErrorFunction( req, res, next )).catch(next);
}