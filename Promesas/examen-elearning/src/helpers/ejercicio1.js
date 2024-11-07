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
            updatedCourses.push(await updateResponse.json());
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



