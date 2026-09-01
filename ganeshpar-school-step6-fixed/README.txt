GANESHPAR PRIMARY SCHOOL WEBSITE

STEP 1
- School homepage
- Logo and school photos
- Gujarati responsive design

STEP 2
- Student / Teacher login
- Student dashboard
- Teacher dashboard
- Demo login credentials

STEP 3 - STUDENT PORTAL
- Standard selector: 3 to 8
- Subjects section
- Timetable section for standards 3-8
- Textbook PDF section
- School announcements

STEP 4 - ONLINE EXAM
- Standard 6 MCQ exam system
- 30 MCQs, timer, navigation and automatic score
- Teacher-created MCQs supported for later question banks
- Online MCQ results are kept separate from the official school marksheet

STEP 5 - TEACHER PORTAL
- Student management
- Study material
- MCQ question bank
- Announcements
- Manual exam marks entry

STEP 6 - OFFICIAL SCHOOL MARKSHEET (TEACHER ONLY)
- Only teacher login can open result.html
- Teacher selects a particular student
- Teacher enters marks for each subject for MID (મધ્યસત્ર) or FINAL (વાર્ષિક) exam
- Student standard is taken automatically from the selected student
- Existing subject/exam marks are updated instead of duplicated
- Marksheet combines Mid + Final marks subject-wise
- Overall totals and percentage are calculated automatically
- Print-ready school marksheet
- Online 30-MCQ exam marks are NOT included in this official marksheet
- Student portal does not provide access to the marksheet maker

DEMO STUDENT LOGIN
Student Number: 1001
Password: student123

DEMO TEACHER LOGIN
Username: teacher01
Password: teacher123

HOW TO OPEN
1. Extract the ZIP.
2. Open the folder.
3. Double-click index.html to open it in Chrome.
4. Choose Teacher Portal and login with teacher01 / teacher123.
5. Open "ગુણ અને પરિણામ".
6. Select a student, choose મધ્યસત્ર પરીક્ષા or વાર્ષિક પરીક્ષા, choose a subject, enter marks, and save.
7. Click "પસંદ કરેલા વિદ્યાર્થીની માર્કશીટ" to open the official marksheet.

FIX: Home page Online Exam card now opens the Student Login instead of showing 'Coming Soon'. Direct exam.html access also requires student login.


REAL STUDENT ACCOUNTS
- Imported from the school-provided Excel file.
- Student accounts created: 177.
- Every account has a unique username and temporary password.
- Aadhaar UID is NOT used as username/password and is not exported to the login account files.
- Student numbers generated for the website: 1001 to 1177.
- Teacher credential sheet: student-login-accounts.csv

SECURITY NOTE
This project is currently a static/local demo. For real deployment, move credentials to a server/database and store passwords as secure hashes. Do not publish the CSV publicly.


STUDENT LOGIN FIX
- Imported all 177 records using the Excel columns StudentName, FatherName, SurName, StudyingClass and Section.
- Fixed login.js to use the actual loginForm/username/password IDs in login.html.
- Student accounts are loaded from student-accounts.json.
- Unique credentials are generated for every student.
- Aadhaar UID is not included in the login data.


OFFLINE LOGIN FIX
- Student accounts: 177
- login.js now contains the generated student credentials directly.
- The login no longer fetches student-accounts.json, so it works when index.html is opened by double-clicking.
- Test account 1: STU7001 / Gnp@0001X
- Test account 2: STU8002 / Gnp@0002X


RESULT PORTAL FIX
- Home page "પરિણામ અને માર્ક્સ" now opens student login and then the student-facing result portal.
- Students can view only their own Mid/Final marks.
- Teacher remains the only role that can enter/update marks.
- Teacher portal now loads all 177 real student records instead of a single demo student.
- Result data uses localStorage so teacher-entered marks are visible to the student in the same browser.
- Online MCQ results remain separate from the official Mid/Final marksheet.
