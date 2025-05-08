import db from '../config/database.js';
const { RoleWiseMenu, Menu } = db.models;

export const getLandingPagePath = async (roleId) => {
    const landingMenu = await RoleWiseMenu.findOne({
        where: {
            RoleID: roleId,
            IsLandingPage: true
        },
        include: [{
            model: Menu,
            as: 'Menu', // <- must match this alias!
            attributes: ['URL']
        }]
    });

    return landingMenu?.Menu?.URL || '/'; // fallback if nothing found
};
