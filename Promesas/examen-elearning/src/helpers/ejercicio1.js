export const getCoursesLevel = async (url, level) => {
    try{
        const response = await fetch(`${url}courses`)
        if(!response.ok){
            throw new Error("HTTP Error")
        }

        const data = await response.json();

        const result = data.filter(element => {
           return element.level === level;
    })
        if(result.length>0){
            return result;
        }else{
            throw new Error(" no se encontro el level");
        }
       
    } catch (error) {
        console.log("Error" + error.message);
    }
}

export const createCourse = async (data, url) => {

    if (!data.title || !data.instructor || !data.level || !data.duration || !data.rating || !data.tags) {
        throw new Error("Datos inválidos: faltan propiedades requeridas.");
      }

    try {
    const response = await fetch(`${url}courses`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data)
    })

    if(!response.ok){
        throw new Error("HTTP Error");
    }

    const data2 = await response.json();
    return data2;

} catch (error) {
       console.log("Error: " + error.message); 
}
}


export const updateCourseLevel = async (url) => {
    try {
        const response = await fetch(`${url}courses`); 
        if (!response.ok) {
            throw new Error("Error al obtener los cursos");
        }

        const courses = await response.json();
        const updatedCourses = [];

        for (const course of courses) {
            if (course.duration <= 30) {
                // Si la duración es menor o igual a 30 minutos, agregar "Express" a los tags
                if (!course.tags.includes("Express")) {
                    course.tags.push("Express");
                }
            } else {
                // Si la duración es mayor a 30 minutos, agregar "Extenso" a los tags
                if (!course.tags.includes("Extenso")) {
                    course.tags.push("Extenso");
                }
            }

            // Actualizar el curso en la API
            const updateResponse = await fetch(`${url}courses/${course.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(course), // Actualizar el curso con las nuevas tags
            });

            if (!updateResponse.ok) {
                throw new Error(`Error al actualizar el curso con ID ${course.id}`);
            }

            // Almacenar el curso actualizado
            const act = await updateResponse.json()
            updatedCourses.push(act);
        }

        // Retornar los cursos actualizados
        return updatedCourses;

    } catch (error) {
        console.log("Error: " + error.message);
        return null;
    }
};



export const getAverageRating = async (url, cursos) => {
    try {
        let courseData = [];

        // Obtener los datos de cada curso secuencialmente
        for (const courseId of cursos) {
            const response = await fetch(`${url}courses/${courseId}`);
            if (!response.ok) {
                throw new Error(`Error al obtener el curso con ID ${courseId}`);
            }
            const course = await response.json();
            courseData.push(course); // Agregar cada curso al array
        }

        // Comprobar que los ratings son números válidos
        const totalRating = courseData.reduce((acc, course) => {
            if (typeof course.rating !== 'number' || isNaN(course.rating)) {
                throw new Error(`El rating del curso con ID ${course.id} no es válido.`);
            }
            return acc + course.rating;
        }, 0);

        if (courseData.length === 0) {
            throw new Error("No se encontraron cursos.");
        }

        const averageRating = totalRating / courseData.length;

        return `La media es: ${averageRating.toFixed(2)}`;
    } catch (error) {
        console.log("Error: " + error.message);
        return null;
    }
};


export const removeCourseInProgress = async (studentId, courseId, url) => {
    try {
        // Paso 1: Obtener los datos del estudiante
        const response = await fetch(`${url}students/${studentId}`);
        if (!response.ok) {
            throw new Error("No se encuentra el estudiante");
        }

        const studentData = await response.json();

        // Paso 2: Verificar si el estudiante tiene un array de progreso
        if (!studentData.progress || !Array.isArray(studentData.progress)) {
            throw new Error("El estudiante no tiene cursos en progreso");
        }

        // Paso 3: Buscar el curso en progreso
        const courseIndex = studentData.progress.findIndex(progress => progress.courseId === courseId);
        if (courseIndex === -1) {
            throw new Error("El curso no está en progreso para este estudiante");
        }

        // Paso 4: Eliminar el curso del array de progreso
        studentData.progress.splice(courseIndex, 1);

        // Paso 5: Actualizar los datos del estudiante en la API
        const updateResponse = await fetch(`${url}students/${studentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ progress: studentData.progress })
        });

        if (!updateResponse.ok) {
            throw new Error("Error al actualizar los cursos en progreso del estudiante");
        }

        // Paso 6: Guardar el curso eliminado en localStorage
        const backupProgress = JSON.parse(localStorage.getItem('BackupProgress')) || [];
        backupProgress.push({ studentId, courseId });
        localStorage.setItem('BackupProgress', JSON.stringify(backupProgress));

        console.log(`Curso ${courseId} eliminado del progreso del estudiante ${studentId}`);
    } catch (error) {
        console.log("Error: " + error.message);
    }
};

export const getCompletedCourses = async (studentId, url) => {
    try {
        // Obtener los datos del estudiante
        const response = await fetch(`${url}students/${studentId}`);
        if (!response.ok) {
            throw new Error("No se encuentra el estudiante");
        }
        
        const student = await response.json(); // Obtenemos el estudiante

        // Crear un Map para almacenar los cursos completados
        const completedCourses = new Map();

        for (const progress of student.progress) {
            const courseId = progress.courseId;
            
            const courseResponse = await fetch(`${url}courses/${courseId}`);
            if (!courseResponse.ok) {
                throw new Error("No se encuentra el curso");
            }

            const course = await courseResponse.json(); 
            const totalLessons = course.lessons.length; // Total de lecciones en el curso
            const completedLessons = progress.completedLessons.length; // Lecciones completadas por el estudiante

            if (completedLessons === totalLessons) {
                const courseDetails = {
                    courseTitle: course.title,
                    lastAccess: progress.lastAccess,
                    completedLessons: completedLessons
                };

                completedCourses.set(courseId, courseDetails);
            }
        }

        return completedCourses;

    } catch (error) {
        console.log("Error: " + error.message);
        return new Map(); // En caso de error, devolvemos un Map vacío
    }
};



export const actualizarCurso = async (url, datos, idCurso) => {
    try {
        const response = await fetch(`${url}courses`);
        if (!response.ok) {
            throw new Error("Error al obtener los cursos");
        }

        const data = await response.json();

        console.log("Cursos obtenidos:", data);
        console.log("ID de curso a actualizar:", idCurso);

        // Encontrar el curso específico por ID
        const cursoEncontrado = data.find(curso => curso.id === String(idCurso));
        
        if (!cursoEncontrado) {
            throw new Error("Curso no encontrado");
        }

        // Crear un nuevo objeto con solo los datos a actualizar, manteniendo el resto intacto
        const datosActualizados = {
            ...cursoEncontrado, 
            // Sobrescribir solo los campos proporcionados
            title:  datos.title,
            instructor: datos.instructor,
            level: datos.level ,
            duration: datos.duration,
        };

        const actualizacion = await fetch(`${url}courses/${cursoEncontrado.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosActualizados),
        });

        if (!actualizacion.ok) {
            throw new Error("Error al actualizar el curso");
        }

        const res = await actualizacion.json();
        return res;
        
    } catch (error) {
        console.log("Error: " + error.message);
    }
};


//No funciona
export const restaurarCourse = async (url, studentId, courseId) => {
    try {
        // Obtener los estudiantes desde el servidor
        const responseEstudiantes = await fetch(`${url}students`);
        if (!responseEstudiantes.ok) {
            throw new Error("Error al obtener los estudiantes");
        }
        const estudiantes = await responseEstudiantes.json();

        // Asegurarse de que el studentId sea una cadena para la comparación
        const studentIdString = String(studentId); // Convierte studentId a cadena 
        const courseIdString = String(courseId); // Convierte courseId a cadena

        // Buscar al estudiante por studentId
        const estudiante = estudiantes.find(s => s.id === studentIdString);
        if (!estudiante) {
            throw new Error("Estudiante no encontrado");
        }

        // Recuperar los datos almacenados en localStorage (backup de progreso)
        const datosRecuperados = JSON.parse(localStorage.getItem('BackupProgress')) || [];

        // Verificar si el curso está en los datos guardados de BackupProgress
        const datosGuardados = datosRecuperados.find(element => {
            return element.studentId === studentIdString && element.courseId === courseIdString;
        });

        if (!datosGuardados) {
            throw new Error("No se han encontrado los datos para restaurar el curso");
        }

        // Aquí ya no modificamos directamente `estudiante.progress` dentro de la función

        // Realizar la actualización del estudiante en el servidor sin modificar su progreso directamente
        const updateResponse = await fetch(`${url}students/${studentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(estudiante),
        });

        if (!updateResponse.ok) {
            throw new Error("Error al actualizar los cursos en progreso del estudiante");
        }

        // Eliminar el curso restaurado de BackupProgress en localStorage
        const borrado = datosRecuperados.filter(element => {
            return element.studentId !== studentIdString || element.courseId !== courseIdString;
        });

        // Guardar los datos actualizados en localStorage
        localStorage.setItem('BackupProgress', JSON.stringify(borrado));

        // Retornar el estudiante o algún otro valor según sea necesario
        return estudiante; 

    } catch (error) {
        console.log("Error: " + error.message);
    }
};



/*
Ejercicio de prueba de comparar y pedir fechas a una api realizado por la IA por si cae en el examen


const apiUrl = 'http://localhost:5000/fechas';  // URL para obtener las fechas

// Función para obtener las fechas desde la API
const getFechas = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Error al obtener las fechas');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Función para comparar dos fechas
const compararFechas = async () => {
  try {
    const fechas = await getFechas();
    const fecha1 = new Date(fechas[0].fecha);
    const fecha2 = new Date(fechas[1].fecha);

    if (fecha1 > fecha2) {
      console.log('La primera fecha es mayor que la segunda');
    } else if (fecha1 < fecha2) {
      console.log('La primera fecha es menor que la segunda');
    } else {
      console.log('Las fechas son iguales');
    }
  } catch (error) {
    console.error('Error al comparar fechas:', error.message);
  }
};

*/ 