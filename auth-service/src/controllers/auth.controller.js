const register = async (req, res, next) => {
try {
    const { email , password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    
    res.status(201).json({ message: 'User registered successfully' });
    
} catch (error) {
    next(error);

}
};


const login = async (req, res, next) => {
try {
    const { email , password } = req.body; 
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    res.status(200).json({ message: 'User logged in successfully' });
} catch (error) {
    next(error);
}
};

module.exports = {
    register,
    login
};