// Definimos el listado de cursos.
let cursosDisponibles = [{
        idCurso: 500,
        nombre: 'Lenguajes de programación',
        descripcion: 'Curso para profundizar el tema de algoritmos en distintos lenguajues',
        duracion: '16',
        valor: '20000'
    },
    {
        idCurso: 501,
        nombre: 'Arquitectura de software',
        descripcion: 'Curso para profundizar como se modulariza una aplicación',
        duracion: '10',
        valor: '40000'
    },
    {
        idCurso: 502,
        nombre: 'Bases de datos',
        descripcion: 'Curso explicar como funcionan las bases de datos relacionales',
        duracion: '10',
        valor: '50000'
    }
]

// Datos del estudiante
let estudiante = {
    nombre: '',
    cedula: '',
    curso: ''
}

// Opciones para el ingreso de datos por consola
const opciones = {
    idCurso: {
        demand: true,
        alias: 'i'
    },
    nombreAlumno: {
        demand: true,
        alias: 'n'
    },
    cedula: {
        demand: true,
        alias: 'c'
    }
}

// Definimos la variable para manejar los archivos
const fs = require('fs')
    // Definimos para trabajar con datos ingresados por consola
const argv = require('yargs')
    .command('inscribirme', 'Permite a un aspirante inscribirse a un curso', opciones)
    .argv

// Definimos la función para imprimir los cursos.
let imprimirCursos = (cursosDisponibles, callback) => {
    setTimeout(() => {
        let i = 0
        while (i < cursosDisponibles.length) {
            let cursoEncontrado = cursosDisponibles.find(nombreCursoABuscar => nombreCursoABuscar.nombre === cursosDisponibles[i].nombre)
            callback(cursoEncontrado)
            i = i + 1
        }
    }, 2000)
}

// Definimos la funcion que nos creará el archivo
let crearArchivo = (estudiante) => {
    let textoMatricula = 'El estudiante ' + estudiante.nombre + '\n' +
        ' con cédula ' + estudiante.cedula + ' se ha matriculado en el curso ' + estudiante.curso + ' de manera exitosa.'
    fs.writeFile('constancia.txt', textoMatricula, (err) => {
        if (err) throw (err)
        console.log('Se ha creado el archivo con la constancia de matrícula.')
    })
}

if (argv.i === undefined) {
    console.log('******************* Los cursos disponibles son ******************')
        // Llamamos la funcion para imprimir los cursos
    imprimirCursos(cursosDisponibles, function(resultado) {
        console.log(resultado.nombre + ' cuyo ID es ' + resultado.idCurso + ' el cual tiene un costo de ' + resultado.valor + ' COP y una duración de ' + resultado.duracion + ' semanas.')
    })
} else {
    let cursoRecuperado = cursosDisponibles.find(idCursoABuscar => idCursoABuscar.idCurso === argv.i)
    if (cursoRecuperado === undefined) {
        console.log('******************** El id ' + argv.i + ' no fue encontrado ****************** ')
        console.log('******************* Los cursos disponibles son ******************')
            // Llamamos la funcion para imprimir los cursos
        imprimirCursos(cursosDisponibles, function(resultado) {
            console.log(resultado.nombre + ' cuyo ID es ' + resultado.idCurso + ' el cual tiene un costo de ' + resultado.valor + ' COP y una duración de ' + resultado.duracion + ' semanas.')
        })
    } else {
        estudiante.nombre = argv.n
        estudiante.cedula = argv.c
        estudiante.curso = cursoRecuperado.nombre
        crearArchivo(estudiante)
    }
}