import { getCoursesLevel,createCourse,updateCourseLevel,getAverageRating,removeCourseInProgress,getCompletedCourses } from "./helpers/ejercicio1.js";

const url = 'http://localhost:3500/'; // Replace with your actual API URL

export const init = async () => {
    // Test getCoursesLevel
    try {
        console.log("Testing getCoursesLevel...");
        const levelTestResult = await getCoursesLevel(url, 'Beginner');
        console.log(levelTestResult ? levelTestResult : 'No courses found at this level.');
    } catch (error) {
        console.error("getCoursesLevel failed: " + error.message);
    }

    // Test createCourse
    try {
        console.log("Testing createCourse...");
        const newCourse = {
            title: 'Intro to Programming',
            instructor: 'John Doe',
            level: 'Beginner',
            duration: 45,
            rating: 4.5,
            tags: ['Programming', 'Basics']
        };
        const createdCourse = await createCourse(newCourse, url);
        console.log(createdCourse ? 'Course created successfully' : 'Failed to create course.');
    } catch (error) {
        console.error("createCourse failed: " + error.message);
    }

    // Test updateCourseLevel
    try {
        console.log("Testing updateCourseLevel...");
        const updatedCourses = await updateCourseLevel(url);
        console.log(updatedCourses ? 'Courses updated successfully' : 'Failed to update courses.');
    } catch (error) {
        console.error("updateCourseLevel failed: " + error.message);
    }

    // Test getAverageRating
    try {
        console.log("Testing getAverageRating...");
        const averageRating = await getAverageRating(url, [1, 2, 3]);
        console.log(averageRating ? averageRating : 'No average rating available.');
    } catch (error) {
        console.error("getAverageRating failed: " + error.message);
    }

    // Test removeCourseInProgress
    try {
        console.log("Testing removeCourseInProgress...");
        await removeCourseInProgress(1, 1, url); // Example student ID and course ID
        console.log('Course removed from progress successfully.');
    } catch (error) {
        console.error("removeCourseInProgress failed: " + error.message);
    }

    // Test getCompletedCourses
    try {
        console.log("Testing getCompletedCourses...");
        const completedCourses = await getCompletedCourses(1, url); // Example student ID
        console.log(completedCourses.size > 0 ? 'Completed courses found.' : 'No completed courses found.');
    } catch (error) {
        console.error("getCompletedCourses failed: " + error.message);
    }
};

// Call init() to run the tests
init();
