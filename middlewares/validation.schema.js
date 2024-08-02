const { body } = require('express-validator') //{body,validationResult}


const validationschema = () => {



    return [
        body('title')
            .notEmpty()
            .withMessage("title is empty")
            .isLength({ min: 2 })
            .withMessage("title at least is 2 digits"),
        body("price").
            notEmpty()
            .withMessage("price is empty")
            .isNumeric()
            .withMessage("price not number")


    ]
}
module.exports=validationschema

// export{
//     validationschema
// }