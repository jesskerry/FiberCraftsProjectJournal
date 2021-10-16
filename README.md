### Link to deployed app:
https://jkerry-389n-frontend.herokuapp.com/

### Instructions to run:

run npm install in the FinalProjectImplementation directory, as well as in both the frontend and backend directories. Otherwise, there are no extra instructions.

(Note: When I deployed to heroku I did have to run "npm install multer" in the backend, even after running "npm install", but when I cloned the git repo to test it that was not a problem and "npm install" on its own was fine).

### Database username and password:

dbUser, dbUserPassword

### Additional notes about the deployed version:

While working on my project, I read that saving actual images to the database is bad practice because of how much space it takes up and that it is preferable to upload the images to a folder in the backend and then just save the path to the image in the database. Since the version on gitlab and the deployed version are run from separate copies of the project, this means that new images added will not be shared between them. So if images are added/changed when running the code from gitlab on localhost, those images will not be displayed if you then check the deployed version of the app. Likewise, images added while using the deployed version will not show up if you switch back to the gitlab code. This is the behavior I expect it to have, not a bug, and I wouldn't expect this to be a problem if the app were a real product either, because ideally it would only be run off of the deployed version then.