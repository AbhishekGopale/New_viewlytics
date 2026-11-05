const userModel = require("../app/admin/models/user");
const subAdminModel = require("../app/admin/models/subadmin");
const clientModel = require("../app/admin/models/client");

const jwt = require("jsonwebtoken");





// exports.ensureAuthenticateAdmin = async (req, res, next) => {
//     let token;
//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//     ) {
//         try {

//             token = req.headers.authorization.split(" ")[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             req.user = await userModel.findOne({
//                 where: { id: decoded.id, role_name: "npm" },
//                 raw: true,
//                 nest: true
//             });

//             next();

//         } catch (error) {
//             return res.status(401).json({
//                 error: true,
//                 statusCode: 401,
//                 message: "Not authorized,token failed",
//                 errors: error.message,
//             });
//         }
//     }
//     if (!token) {
//         return res.json({
//             error: true,
//             statusCode: 401,
//             message: "Not authorized",
//             errors: "No token",
//         });
//     }
// }


exports.ensureAuthenticateAdmin = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded, ":________________________")

            if (decoded.role_id == 1) {
                req.user = await userModel.findOne({
                    where: { id: decoded.id, role_name: "admin" },
                    raw: true,
                    nest: true
                });
            } else if (decoded.role_id == 8) {
                req.user = await subAdminModel.findOne({
                    where: { id: decoded.id, role_name: "sub_admin" },
                    raw: true,
                    nest: true
                });
            }



            next();
        } catch (error) {
            return res.status(401).json({
                error: true,
                statusCode: 401,
                message: "Not authorized,token failed",
                errors: error.message,
            });
        }
    }
    if (!token) {
        return res.json({
            error: true,
            statusCode: 401,
            message: "Not authorized",
            errors: "No token",
        });
    }

}



exports.ensureAuthenticateNPM = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await userModel.findOne({
                where: { id: decoded.id, role_name: "npm" },
                raw: true,
                nest: true
            });

            next();

        } catch (error) {
            return res.status(401).json({
                error: true,
                statusCode: 401,
                message: "Not authorized,token failed",
                errors: error.message,
            });
        }
    }
    if (!token) {
        return res.json({
            error: true,
            statusCode: 401,
            message: "Not authorized",
            errors: "No token",
        });
    }
}

exports.ensureAuthenticateTL = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await userModel.findOne({
                where: { id: decoded.id, role_name: "tl" },
                raw: true,
                nest: true
            });

            next();

        } catch (error) {
            return res.status(401).json({
                error: true,
                statusCode: 401,
                message: "Not authorized,token failed",
                errors: error.message,
            });
        }
    }
    if (!token) {
        return res.json({
            error: true,
            statusCode: 401,
            message: "Not authorized",
            errors: "No token",
        });
    }
}

exports.ensureAuthenticateASM = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await userModel.findOne({
                where: { id: decoded.id, role_name: "asm" },
                raw: true,
                nest: true
            });

            next();

        } catch (error) {
            return res.status(401).json({
                error: true,
                statusCode: 401,
                message: "Not authorized,token failed",
                errors: error.message,
            });
        }
    }
    if (!token) {
        return res.json({
            error: true,
            statusCode: 401,
            message: "Not authorized",
            errors: "No token",
        });
    }
}

exports.ensureAuthenticatePromoter = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await userModel.findOne({
                where: { id: decoded.id, role_name: "promoter" },
                raw: true,
                nest: true
            });

            next();

        } catch (error) {
            return res.status(401).json({
                error: true,
                statusCode: 401,
                message: "Not authorized,token failed",
                errors: error.message,
            });
        }
    }
    if (!token) {
        return res.json({
            error: true,
            statusCode: 401,
            message: "Not authorized",
            errors: "No token",
        });
    }
}

exports.ensureAuthenticateMerchendiser = async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);



            req.user = await userModel.findOne({
                where: { id: decoded.id, role_name: "merchandiser" },
                raw: true,
                nest: true
            });

            next();

        } catch (error) {
            return res.status(401).json({
                error: true,
                statusCode: 401,
                message: "Not authorized,token failed",
                errors: error.message,
            });
        }
    }
    if (!token) {
        return res.json({
            error: true,
            statusCode: 401,
            message: "Not authorized",
            errors: "No token",
        });
    }

}

exports.ensureAuthenticateMER_PRO_TL_ASM = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            //  console.log("Hyyyyyyyyy")
           
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("toen", token)
            console.log(decoded, "decoded")
            if (decoded.role_name == 'asm') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "asm" }, raw: true, nest: true });
            } else if (decoded.role_name == 'merchandiser') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "merchandiser" }, raw: true, nest: true });
            } else if (decoded.role_name == 'tl') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "tl" }, raw: true, nest: true });
            } else if (decoded.role_name == 'promoter') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "promoter" }, raw: true, nest: true });
            }



            next();

        } catch (error) {
            return res.status(401).json({
                error: true,
                statusCode: 401,
                message: "Not authorized,token failed",
                errors: error.message,
            });
        }
    }
    if (!token) {
        return res.json({
            error: true,
            statusCode: 401,
            message: "Not authorized",
            errors: "No token",
        });
    }

}

exports.ensureAuthenticateMER_PRO_TL_ASM_NPM_Admin = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            //  console.log("Hyyyyyyyyy")

            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("toen" , token)
            // console.log(decoded, "decoded")
            if (decoded.role_name == 'asm') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "asm" }, raw: true, nest: true });
            } else if (decoded.role_name == 'merchandiser') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "merchandiser" }, raw: true, nest: true });
            } else if (decoded.role_name == 'tl') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "tl" }, raw: true, nest: true });
            } else if (decoded.role_name == 'promoter') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "promoter" }, raw: true, nest: true });
            } else if (decoded.role_name == 'npm') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "npm" }, raw: true, nest: true });
            } else if (decoded.role_name == 'admin') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "admin" }, raw: true, nest: true });
            } else if (decoded.role_name == 'ta') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "ta" }, raw: true, nest: true });
            }



            next();

        } catch (error) {
            return res.status(401).json({
                error: true,
                statusCode: 401,
                message: "Not authorized,token failed",
                errors: error.message,
            });
        }
    }
    if (!token) {
        return res.json({
            error: true,
            statusCode: 401,
            message: "Not authorized",
            errors: "No token",
        });
    }

}

// exports.ensureAuthenticateMER_PRO_TL_ASM = async (req, res, next) => {
//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//     ) {
//         try {

//             token = req.headers.authorization.split(" ")[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             console.log(decoded, "decoded")
//             if (decoded.role_name == 'asm') {
//                 req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "asm" }, raw: true, nest: true });
//             } else if (decoded.role_name == 'merchandiser') {
//                 req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "merchandiser" }, raw: true, nest: true });
//             } else if (decoded.role_name == 'tl') {
//                 req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "tl" }, raw: true, nest: true });
//             } else if (decoded.role_name == 'promoter') {
//                 req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "promoter" }, raw: true, nest: true });
//             }



//             next();

//         } catch (error) {
//             return res.status(401).json({
//                 error: true,
//                 statusCode: 401,
//                 message: "Not authorized,token failed",
//                 errors: error.message,
//             });
//         }
//     }
//     if (!token) {
//         return res.json({
//             error: true,
//             statusCode: 401,
//             message: "Not authorized",
//             errors: "No token",
//         });
//     }

// }

exports.ensureAuthenticateMER_PRO_TL_ = async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await userModel.findOne({
                where: {
                    id: decoded.id,
                    $or: [
                        {
                            role_name:
                            {
                                $eq: "merchandiser"
                            }
                        },
                        {
                            role_name:
                            {
                                $eq: "promoter"
                            }
                        },
                        {
                            role_name:
                            {
                                $eq: "tl"
                            }
                        },

                    ]
                },
                raw: true,
                nest: true
            });

            next();

        } catch (error) {
            return res.status(401).json({
                error: true,
                statusCode: 401,
                message: "Not authorized,token failed",
                errors: error.message,
            });
        }
    }
    if (!token) {
        return res.json({
            error: true,
            statusCode: 401,
            message: "Not authorized",
            errors: "No token",
        });
    }

}

exports.ensureAuthenticateAdmin_NPM = async (req, res, next) => {
    console.log(['req.headers.authorization-----------',req.headers.authorization])
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded,"deode")
            if (decoded.role_name == 'admin') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "admin" }, raw: true, nest: true });
            } else if (decoded.role_name == 'npm') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "npm" }, raw: true, nest: true });
            } else if (decoded.role_name == 'ta') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "ta" }, raw: true, nest: true });
            }
            next();

        } catch (error) {
            console.log('e===',error)
            return res.status(401).json({
                error: true,
                statusCode: 401,
                message: "Not authorized,token failed",
                errors: error.message,
            });
        }
    }
    if (!token) {
        return res.json({
            error: true,
            statusCode: 401,
            message: "Not authorized",
            errors: "No token",
        });
    }

}

exports.ensureAuthenticateforW_A = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role_name == 'admin') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "admin", is_login: "1" }, raw: true, nest: true });
            } else if (decoded.role_name == 'npm') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "npm", is_login: "1" }, raw: true, nest: true });
            } else if (decoded.role_name == 'asm') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "asm", is_login: "1" }, raw: true, nest: true });
            } else if (decoded.role_name == 'tl') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "tl", is_login: "1" }, raw: true, nest: true });
            } else if (decoded.role_name == 'ta') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "ta", is_login: "1" }, raw: true, nest: true });
            } else if (decoded.role_name == 'sub_admin') {
                req.user = await subAdminModel.findOne({
                    where: { id: decoded.id, role_name: "sub_admin" },
                    raw: true,
                    nest: true
                });
            } else if (decoded.role_name == 'npc') {
                req.user = await clientModel.findOne({
                    where: { id: decoded.id, role_name: "npc" },
                    raw: true,
                    nest: true
                });
            } else if (decoded.role_name == 'ase') {
                req.user = await clientModel.findOne({
                    where: { id: decoded.id, role_name: "ase" },
                    raw: true,
                    nest: true
                });
            } else if (decoded.role_name == 'se') {
                req.user = await clientModel.findOne({
                    where: { id: decoded.id, role_name: "se" },
                    raw: true,
                    nest: true
                });
            }
            next();

        } catch (error) {
            return res.status(401).json({
                error: true,
                statusCode: 401,
                message: "Not authorized,token failed",
                errors: error.message,
            });
        }
    }
    if (!token) {
        return res.json({
            error: true,
            statusCode: 401,
            message: "Not authorized",
            errors: "No token",
        });
    }

}

exports.ensureAuthenticateforW_A_Logout = async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role_name == 'admin') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "admin" }, raw: true, nest: true });
            } else if (decoded.role_name == 'npm') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "npm" }, raw: true, nest: true });
            } else if (decoded.role_name == 'asm') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "asm" }, raw: true, nest: true });
            } else if (decoded.role_name == 'tl') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "tl" }, raw: true, nest: true });
            } else if (decoded.role_name == 'ta') {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: "ta" }, raw: true, nest: true });
            }
            next();

        } catch (error) {
            return res.status(401).json({
                error: true,
                statusCode: 401,
                message: "Not authorized,token failed",
                errors: error.message,
            });
        }
    }
    if (!token) {
        return res.json({
            error: true,
            statusCode: 401,
            message: "Not authorized",
            errors: "No token",
        });
    }

}


exports.ensureAuthenticateWeb = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const secret = process.env.JWT_SECRET || "thisistheshubhamprojectdontdoenythinginthisproject";
            const decoded = jwt.verify(token, secret);

            const roleName = (decoded.role_name || '').toLowerCase();
            if (roleName) {
                req.user = await userModel.findOne({ where: { id: decoded.id, role_name: roleName }, raw: true, nest: true });
            }
            if (!req.user && decoded.id) {
                req.user = await userModel.findOne({ where: { id: decoded.id }, raw: true, nest: true });
            }
            next();

        } catch (error) {
            return res.status(401).json({
                error: true,
                statusCode: 401,
                message: "Not authorized,token failed",
                errors: error.message,
            });
        }
    } else {
        return res.status(401).json({
            error: true,
            statusCode: 401,
            message: "Not authorized",
            errors: "No token",
        });
    }
}




