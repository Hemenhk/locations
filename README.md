# Locations


![Locations mockup images](src/assets/readme/home%20page.png)

Locations is a React website that offers the user an opportunity to post a rental location.

The main purpose of the app is to provide users the ability to share their unused housing for rental purposes, thus being able to drive in additional income.

Visit the deployed application [here](https://locations-p5.herokuapp.com/).



## Table of Contents

1. [User Experience (UX)]
    1. [Strategy]
        1. [Project Goals]
        2. [User Goals]
        3. [Strategy Table]
    2. [Scope]
        1. [User Stories]
    3. [Structure]
        1. [Database Model]
    4. [Skeleton]
        1. [Wireframes]
    5. [Surface](#surface)
        1. [Color Scheme]
        2. [Typography]
2. [Features](#features)
   1. [NavBar](#navbar)
   2. [Home Page](#home-page)
   3. [Products Page](#products-page)
   4. [Product Details Page](#product-details-page)
   5. [Products Admin](#products-admin)
   5. [Shopping Bag Page](#shopping-bag-page)
   6. [Checkout Page](#checkout-page)
   7. [Checkout Success Page](#checkout-success-page)
   8. [Profile Page](#profile-page)
   9. [Favorites Page](#favorites-page)
   10. [Reviews Page](#reviews-page)
   11. [Reviews Admin](#reviews-admin)
   12. [Organizations Page](#organizations-page)
   13. [Accounts Pages](#accounts-pages)
   14. [404 Error Page](#404-error-page)
3. [Technologies Used](#technologies-used)
    1. [Languages Used](#languages-used)
    2. [Libraries and Frameworks](#languages-and-frameworks)
    3. [Packages / Dependencies Installed](#packages--dependencies-installed)
    4. [Database Management](#database-management)
    5. [Payment Service](#payment-service)
    6. [Cloud Storage](#cloud-storage)
    7. [Tools and Programs](#tools-and-programs)
## User Experience (UX)

### Strategy

#### Project Goals

* Structure is easy to grasp and navigation is effortless, for an easy user experience.

* The color scheme is a dark grey background with pastel blue accents to make it easier on the eyes when using the app.

* The design is responsive to make the app accessible on multiple screen sizes.

* Site users are offered the chance to create an account, and are encouraged to do so on the home page.

* An easy post process makes the experience easier.

#### User Goals

**Epic 1 - Account Experience**

* As a user I can create a new account so that I can access all the features for signed up users.

* As a user I can sign in to the app so that I can access functionality for logged in users.

* As a user I can tell if I am logged in or not so that I can log in if I need to.

* As a user I can maintain my logged-in status until I choose to log out so that my user experience is not compromised

**Epic 2 - Profile Experience**

* As a logged in user I can edit my profile so that I can change my profile picture and bio

* As a logged in user I can update my username and password so that I can change my display name and keep my profile secure.

* As a user I can view statistics about a specific user: bio and number of posts so that I can learn more about them

* As a user I can view user's avatars so that I can easily identify users of the application


**Epic 3 - Post Experience**

* As a logged in user I can create posts so that I can share my images with the world!

* As a post owner I can edit my post title and description so that I can make corrections or update my post after it was created


**Epic 4 - Navigation Experience**

* As a user I can view a navbar from every page so that navigate easily between pages

* As a logged out user I can see sign in and sign up options so that I can sign in/sign up

* As a user I can navigate through pages quickly so that view content seamlessly without page refresh

* As a user I can view the details of a single post so that I can learn more about it

* As a user I can view all the most recent posts, ordered by most recently created first so that I am up to date with the newest content

* As a user I can read reviews on posts so that I can read what other users think about the posts

* As a user I can view other users profiles so that I can see their posts and learn more about them.

* As a user I can view all the posts by a specific user so that I can catch up on their latest posts

* As a user I can view the posts page so that I can read the comments about the post

* As a user I can keep scrolling through the images on the site, that are loaded for me automatically so that I don't have to click on "next page" etc

* As a user, I can search for posts with keywords, so that I can find the posts and user profiles I am most interested in.

**Epic 5 - Actions Experience**

* As a logged in user I can rate a post so that I can show my support for the posts that I liked me

* As an owner of a review I can delete my review so that I can control removal of my review from the application

* As an owner of a review I can edit my review so that I can fix or update my existing review

* As a user I can see how long ago a review was made so that I know how old a review is

* As a logged in user I can add reviews to a post so that I can share my thoughts about the post


### Strategy

To achieve the strategy goals, I wish to implement the following features:

* A navigation bar, that will be fixed at the top, that will allow the user to easily navigate the app.

* A Home page, which will allow the user the user to take part of the posts, as well as urging the user to sign up and post their own locations.

* A Sign Up page, that will allow the user to create their own account.

* A Sign In page, that will allow the user to sign in to their account.

* A Add Post page, that allows the user to add their own post.

* A Profile page, that will display the user's posts and allow them to edit their profile.

* A Searc Bar, to allow users to search for specific posts.

* A fully responsive design that works well on different screen sizes and devices.

* An Error 404 page that tells the user that a page does not exist.

* A full CRUD functionality for users to create, read, update and delete posts, and edit their profiles.

### Scope

GitHub projects was used as my project management tool to track the determined user stories. A Kanban board was used to focus on specific tasks, where each was labelled as "must-have", "should-have" and "could-have" to focus the attention on what must be achieved vs what ought to be achieved.

**Start**

![User Stories Progress -- Start](src/assets/readme/kanban.png)

**Step 2**

![User Stories Progress -- Step 2](src/assets/readme/step%202.png)

**Step 3**

![User Stories Progress -- Step 3](src/assets/readme/step%203.png)

**Step 4**

![User Stories Progress -- Step 4](src/assets/readme/step%204.png)

**Step 5**

![User Stories Progress -- Step 5](src/assets/readme/step%205.png)

**Step 6**

![User Stories Progress -- Step 6](src/assets/readme/step%206.png)

**Step 7**

![User Stories Progress -- Step 6](src/assets/readme/step%207.png)


### Structure

![Location Site Structure](src/assets/readme/tree%20structure.png)

#### Database

The databse model was designed using [drawsql](https://drawsql.app/) The type of databases being used are SQLite3 during development, and [PostgreSQL](https://www.postgresql.org/).

![Locations Database Model](src/assets/readme/database.png)

### Design

#### Color Scheme 

As the app is a blog/post application, there is a lot of unused space on the screen. As such a darker scheme was chosen, as the white background was visually unappealing. For the various elements such as links and spans, a light blue color was chosen as an accent.

* App background: #101010

* Content background: #202020

* PostContent: #1a1a1a

* Accents: #2a9fd6

* Misc: #d37d36

#### Typography

The font mainly used across the website was Oswald. It was used at one weight. The other was Koulen, which was used for the navlinks, as it has more weight.

There two fonts were chosen as they grab the attention of the user, whilst providing an easy reading experience. 


## Features 

### Navbar

* The NavBar component contains a logo and navigation links.

* The logo acts as a link to the home page.

* The NavBar has a conditional rendering depending on the user's sign in status. If the user is not signed in, the home, sign in and sign up icons appear. If the user is signed in, the home, add post, sign out and profile icons appear instead. 

### Home Page

#### Welcome Message

The first section of the home page is a welcoming message. It renders conditionally on the user's signed in status. If the user is signed out, then the message encourages them to sign up. If the user is signed in, the message urges the user to add a post.

#### Search Bar

* The search bar allows users to search the app for specific posts or users using keywords.

#### Infinity Post Page

The main part of the home page are the display of posts. By using the infinity component, posts fetched load seemlessly.

### Sign In Page

The sign in page contains a form with two input fields labelled "username" and "password". Underneath the fields, the user is urged to create an account if they have not already done so.

### Sign Up Page

The sign up page contains a form with three input fields for username, password and confirm password. Underneath the form, the user is reminded of signing in to an existing account if they already have one.

### Add Posts Page

The add post page, contains a form where the user can fill in title, price, contact, content and image fields. Upon successfully filling the fields, they submit a new post to the app, which will be displayed on their profile page and the home page.

### Profile Page

The profile page contains a loop of posts created by the user. Here the user can edit their own profile and their posts. 

#### Edit Profile Page

The user is able to change their avatar and add a bio.

#### Change Username Page

The user is able to change their username.

#### Change Password Page

The user is able to change their passsword.

### Post Detail Page

The user is able to rate and review each post, as long as it does not belong to them. If it does belong to the user, they can edit their post. 

### 404 Error Page

A 404 page is displayed if the user lands on an non-existing url, that tells them there is nothing to be seen.

## Technologies Used

### Languages Used

* [HTML5](https://en.wikipedia.org/wiki/HTML)
* [CSS3](https://en.wikipedia.org/wiki/CSS)
* [JavaScript](https://en.wikipedia.org/wiki/JavaScript)

### Libraries and Frameworks

* [React](https://reactjs.org/) was used to build the app.

* [React Bootstrap](https://react-bootstrap.github.io/) was used to style the app and help with responsiveness.

* [Axios](https://axios-http.com/) was used to fetch request and responses from the API.

* [Testing Library](https://testing-library.com/) was used to test the code written.

* [React Router Dom](https://reactrouter.com/) was used for easy routing functionality.

* [Google Fonts](https://fonts.google.com) was used to import fonts to the HTML file, and used throughout the project.

* [Font Awesome](https://fontawesome.com) was used to add icons to various links.


### Database Management

* [SQLite](https://www.sqlite.com/index.html) database was used as the database during the development.

* [ElephantSQL - Postgres](https://www.elephantsql.com/) database was used in production, based on Postgres and provided by ElephantSQL.

### Cloud Storage

* [Cloudinary](https://cloudinary.com/) was used to store static and media files.

### Tools and Programs

* [Git](https://git-scm.com)

* [GitPod](https://gitpod.io/)

* [GitHub](https://github.com/)

* [Heroku](https://heroku.com)

* [Chrome DevTools](https://developer.chrome.com/docs/devtools/) was used during development to debug the app. 

* [W3C Markup Validator](https://validator.w3.org/) was used to validate custom CSS code.

* [Favicon.io](https://favicon.io) was used to add a custom favicon.

## Testing

The testing documentation for this project can be found [here](https://github.com/Hemenhk/locations/blob/main/TESTING.md)


## Deployment

The project was deployed using [GitPod](https://gitpod.io/). All code was commited to [Git](https://git-scm.com) and then pushed on to [GitHub](https://github.com/) using the terminal in [GitPod](https://gitpod.io/). The application is deployed on Heroku.

### How To Use This Project

To use this project, one can either fork or clone the repository.

#### Forking 
By forking this repository you copy the original to view and make changes to the code, without affecting the original repository by following these steps:

1. Log into your GitHub account.
2. Navigate to the repository and in the upper-right corner, click on "Fork". 
3. In the "Create a new fork" page, press the "Create fork" button.
4. To edit the code, click on the "Gitpod" button to launch your own workspace. 
5. Changes in the new repository can be merged with the original via a pull request.


#### Clone GitHub Repository

By cloning the GitHub repository, you can create a local copy of the original on your own system. To clone this repository follow these steps:

1. Log into your GitHub account.
2. Navigate to the repository and click the dropdown on the "Code" button..
3. To clone using HTTPS, copy the code provided in the field.
4. Open Git Bash and change the current directory to the location where you wish the cloned directory to be made.
5. Type git clone, then paste the URL that you copied.
6. Press Enter, and your local clone is created.


### Deployment To Heroku

This project is deployed using Heroku, with all static files being uploaded to Cloudinary. These are the steps to deploy to Heroku:

1. Log in to your Heroku account.
2. Press "Create new app", and select the desired app name and the region of which you are located, then press "Create app".
3. Press the "Deploy" tab and click on "GitHub" in the "Deployment method" field. 
4. In the "Connect to GitHub" section select your profile and search for the repository. When the repository appears, click on "Connect".
5. When the connection is successful, scroll down to the "Manual deplpoy" section and click on "Deploy Branch". 
6. When the app is successfully deployed, press "Open app" to see the final application. 


## Credits

### Media 

* [Unsplash](https://unsplash.com/)
    * All images used for the posts where downloaded from unsplash.


### Code

* The code from Code Institute's "Moments" project was used as the main reference, from which this project was built, and was of great help.

## Known Bugs

**Fetching post edit fields from API**

An issue occured when fetching the prepolulated fields in the PostEditForm. The "price" and "contact" fields were returned empty.

This issue was resolved by adding the necessary models and meta fields in the API used for this project. After which the fields were returned prepopulated with the original posts input. 

**Editing the profile**

An issue occured when trying to send a request interceptor to the API, by using the PUT method. When trying to change the avatar image and bio, a 400 Bad Request error was thrown. The code was correct, in both the front-end and back-end. 

No solution has been found so far, and due to time limits, will be fixed in the future. 

## Acknowledgements 

* My family for showing me support during the development of this project.

* My mentor, Marcel, for providing invaluable knowledge and feedback during out meetings. His perspective has been immensely useful, and without his help, some code may not have made an appearence. 

* Code Institute for providing me with the material to build this project, and the Slack community for their help and positive comments. 