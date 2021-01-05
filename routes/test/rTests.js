module.exports = function (app, mongo) {

    app.get('/test/resetDB', function (req, res) {
        let criterio = {};
        let collection;

        //Abrimos la conexion con mongo
        mongo.MongoClient.connect(app.get('db'), function (err, db) {
            if (err) {
                res.send(String("Error al resetear la BD."));
            } else {
                //Eliminamos todas las amistades del sistema
                collection = db.collection('amistades');
                criterio = {};
                collection.remove(criterio, function (err, result) {
                    if (err) {
                        db.close();
                        res.send(String("Error al resetear la BD."));
                    }
                });

                //Eliminamos todas las invitaciones del sistema
                collection = db.collection('invitaciones');
                criterio = {};
                collection.remove(criterio, function (err, result) {
                    if (err) {
                        db.close();
                        res.send(String("Error al resetear la BD."));
                    }
                });

                //Eliminamos todos los usuarios del sistema
                collection = db.collection('usuarios');
                criterio = {};
                collection.remove(criterio, function (err, result) {
                    if (err) {
                        db.close();
                        res.send(String("Error al resetear la BD."));
                    }
                });

                //Si se han eliminado todos insertamos los nuevos
                let seguro = app.get("crypto").createHmac('sha256', app.get('clave'))
                    .update("123456").digest('hex');
                let usuarios =
                    [
                        {email: "pedro@email.com", name: "Pedro", lastName: "Díaz", password: seguro},
                        {email: "lucas@email.com", name: "Lucas", lastName: "Núñez", password: seguro},
                        {email: "maria@email.com", name: "María", lastName: "Rodríguez", password: seguro},
                        {email: "marta@email.com", name: "Marta", lastName: "Almonte", password: seguro},
                        {email: "pelayo@email.com", name: "Pelayo", lastName: "Valdes", password: seguro}
                    ];
                collection = db.collection('usuarios');
                collection.insertMany(usuarios, function (err, result) {
                    if (err) {
                        db.close();
                        res.send(String("Error al resetear la BD."));
                    }
                });

                res.send(String("Base de datos reiniciada."));
                db.close();
            }
        });
    })
};