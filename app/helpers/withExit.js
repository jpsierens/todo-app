const withExit = (func) => (router, path, params) => {
    func(...params);
    return router.push(path);
};

export default withExit;
