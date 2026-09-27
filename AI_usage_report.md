**AI Usage Report**  
 Course: SMD  
 Assignment: 1  
 Student Name: Aneeqa Wali  
 Registration No.: 23i3090  
 Date: 27-09-2026

**1\. AI Tool(s) Used**  
 Claude

**2\. Purpose of AI Usage**

* Reviewing my app against the assignment's rubric to check completeness  
* Understanding React/React Native concepts (state, reusable components, conditional rendering)  
* Refactoring code structure (splitting a single-file app into reusable components and a separate data file)  
* Implementing an additional feature (sort by attendance) and a UI animation (pulsing "Low" attendance badge)  
* Debugging a dependency error  
* Drafting project documentation (README)

**3\. Important Prompts Used**

* "Read this assignment, is this solution correct?"  
* "Add sorting and split the code into separate component files"  
* "Now readme"  
* \[Insert your actual prompt about the dependency error, e.g.\] "Here's a screenshot of my error — what caused it?"

**4\. AI-Generated Output**  
 Claude reviewed my app against the assignment rubric and pointed out two gaps: everything was in one file, and I was missing an "advanced feature." It then refactored the code into StatCard.js, CourseCard.js, and data/courses.js, added a sort-by-attendance toggle, and added a pulsing animation on the low-attendance badge using React Native's Animated API. It also diagnosed a dependency error as a missing package entry and drafted a README covering the problem statement, features, setup steps, and project structure.

**5\. Changes Made by Me**  
Added dependencies

**6\. My Understanding**  
 The dependency error happened because react-native-chart-kit needs react-native-svg as a peer dependency, and it wasn't listed in package.json. Adding it as a dependency and reinstalling fixed the error. In the refactor, useState tracks which screen is showing and holds the course list, search text, and sort order; Animated.Value with Animated.loop drives the pulsing badge by cycling its opacity between 1 and 0.4.

**7\. Verification and Testing**  
 Ran the app in Expo Go/emulator, confirmed the sort button cycles correctly, confirmed the Low badge pulses only for courses under 75% attendance, confirmed the form validation still rejects invalid attendance/marks, any bugs you found and how you fixed them.

**8\. Reflection**  
Learned that have to add dependencies in the file 

**Student Declaration**  
 I confirm that I have used AI tools only as a development assistant and that I understand the code submitted as part of this assignment. I am able to explain and demonstrate the functionality of my application.

Student Name: Aneeqa Wali  
 Date: 27-09-2026

