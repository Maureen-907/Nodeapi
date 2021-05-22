exports.createPostValidator = (req, res, next) => {
    //title4
    console.log("can it be yhat")
    req.check("title", "Write a title").notEmpty();
    req.check("title", "Title must be bewteen 4 to 150 characters").isLength({
        min: 4,
        max: 150
    });
    //body
    req.check("body", "Body must not be empty").notEmpty();
    req.check("body", "Body must be bewteen 4 to 2000 characters").isLength({
        min: 4,
        max: 2000
    });
        //check for errors
        const errors = req.validationErrors();
        // if error show the first one as they happen
        if(errors){
            const firstError = errors.map((error) => error.msg)[0];
            return res.status(400).json({error: firstError});
        }
    //proceed to next middleware
    next(); 
};

exports.userSignupValidator = (req, res, next) =>{
    //name validation
    req.check("name","Name is required").notEmpty();
    // email is require
    req.check("email","Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min: 4,
        max: 2000
    });
    //check passwords
    req.check("password","password is required").notEmpty();
    req.check("password")
    .isLength({min:6})
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
    //check for errors
    const errors = req.validationErrors();
        // if error show the first one as they happen
        if(errors){
            const firstError = errors.map((error) => error.msg)[0];
            return res.status(400).json({error: firstError});
        }
    //proceed to next middleware
    next(); 
};
     
















