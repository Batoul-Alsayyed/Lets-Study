<img src="./readme/title1.svg"/>

<div align="center">

> Hello world! This is the project’s summary that describes the project plain and simple, limited to the space available.  
> **[PROJECT PHILOSOPHY](https://github.com/julescript/well_app#-project-philosophy) • [WIREFRAMES](https://github.com/julescript/well_app#-wireframes) • [TECH STACK](https://github.com/julescript/well_app#-tech-stack) • [IMPLEMENTATION](https://github.com/julescript/well_app#-impplementation) • [HOW TO RUN?](https://github.com/julescript/well_app#-how-to-run)**

</div>

<br><br>

<img src="./readme/title2.svg"/>

> The Well website is an online study platform. The website itself is not just any study platform that shows random students and tutors that you can study with; it encourages students to study with different people from all around the world where they can rate their study colleagues and tutors and chat with them to facilitate the communication processs without the need of outside chating apps where they can waste their time.

### User Stories

### As a student:

- As a regular student, I can view all students from all around the world to study with.
- I can rate other students.
- I can chat with other students where I get notified each time I receive a message.
- I can join live zoom meetings with other students.
- I can view messages sent from other students and send messages to them as well.
- I get notified each time another student sends me a message.

  <br><br>

### As a pro student:

- I can view all tutors and students that are out there.
- I can rate tutors and other students.
- I can chat with other tutors and students where I get notified each time I receive a message.
- I can join live zoom meetings with other students/tutors.
- I can view messages sent from other students/tutors and send messages to them as well.
- I get notified each time another student/tutor sends me a message.
  <br><br>

### As a tutor:

- I can view other tutors/students where I can chat with them and rate them.
- I can view messages sent from teachers/students and send messages to them as well.
- I get notified each time another student/tutor sends me a message.
  <br><br>

### As an admin:

- I can view all users, students, teachers, degrees and studyfields.
- I can add tutors or delete them.
- I can add degrees and studyfields or delete them.
  <br><br>

<img src="./readme/title3.svg"/>

> This design was planned before on paper, then moved to Figma app for the fine details.
> Note that i didn't use any styling library or theme, all from scratch and using pure css modules
> | Landing | Students |
> | -----------------| -----|
> | ![Landing](https://github.com/Batoul-Alsayyed/Lets-Study/blob/main/readme/Group%2048.png) | ![Students](https://github.com/Batoul-Alsayyed/Lets-Study/blob/main/readme/Frame%202.png) |

| Artists results                                                                                | Artist's Albums                                                                               |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| ![Artists results](https://github.com/julescript/spotifyndr/blob/master/demo/Artists_Page.jpg) | ![Artist's Albums](https://github.com/julescript/spotifyndr/blob/master/demo/Albums_Page.jpg) |

<br><br>

<img src="./readme/title4.svg"/>

Here's a brief high-level overview of the tech stack the Well app uses:

- This project uses the [Flutter app development framework](https://flutter.dev/). Flutter is a cross-platform hybrid app development platform which allows us to use a single codebase for apps on mobile, desktop, and the web.
- For persistent storage (database), the app uses the [Hive](https://hivedb.dev/) package which allows the app to create a custom storage schema and save it to a local database.
- To send local push notifications, the app uses the [flutter_local_notifications](https://pub.dev/packages/flutter_local_notifications) package which supports Android, iOS, and macOS.
  - 🚨 Currently, notifications aren't working on macOS. This is a known issue that we are working to resolve!
- The app uses the font ["Work Sans"](https://fonts.google.com/specimen/Work+Sans) as its main font, and the design of the app adheres to the material design guidelines.

<br><br>
<img src="./readme/title5.svg"/>

> Using the above mentioned tech stacks and the wireframes build with figma from the user sotries we have, the implementation of the app is shown as below, these are screenshots from the real app
> | Landing | Home/Search |
> | -----------------| -----|
> | ![Landing](https://github.com/julescript/spotifyndr/blob/master/demo/Landing_Page.jpg) | ![Home/Search](https://github.com/julescript/spotifyndr/blob/master/demo/Search_Page.jpg) |

<br><br>
<img src="./readme/title6.svg"/>

> This is an example of how you may give instructions on setting up your project locally.
> To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/Batoul-Alsayyed/Lets-Study.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = "ENTER YOUR API";
   ```
