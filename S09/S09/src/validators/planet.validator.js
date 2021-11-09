import expressValidator from 'express-validator';
const {body} = expressValidator;

class PlanetValidator{

    complete(){
        return [
            body('name').exists().withMessage('le nom de la planète est requis'),
            body('discoveryDate').exists().withMessage('la date de découverte est requise'),
            body('temperature').exists().withMessage('la température est requise'),
            body('position.x').exists().withMessage('la position x est requise'),
            body('position.y').exists().withMessage('la position y est requise'),
            body('position.z').exists().withMessage('la position z est requise'),
            ...this.partial(),
        ];
    }

    partial(){
        //patch
        return [
            body('discoveryDate').optional()
            .isISO8601().withMessage('Doit être une date').bail()
            .isBefore(new Date().toISOString()).withMessage('doit être dans le passé'),

            body('temperature').optional()
            .isNumeric().withMessage('La valeur de la températue doit être numérique'),

            body('satellites').optional()
            .isArray().withMessage('Les satellites doivent êter un tableau'),

            body('position.x').optional()
            .isFloat({min: -1000, max:1000}).withMessage('la position x doit être comprise entre -1000 et 1000'),
            body('position.y').optional()
            .isFloat({min: -1000, max:1000}).withMessage('la position y doit être comprise entre -1000 et 1000'),
            body('position.z').optional()
            .isFloat({min: -1000, max:1000}).withMessage('la position z doit être comprise entre -1000 et 1000')

        ];
    }

}

export default new PlanetValidator();