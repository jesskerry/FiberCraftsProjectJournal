# Benchmark 4
App name: My Project Journal

Author: Jessica Kerry

No extra instructions other than running npm install and npm start. Since there isn't a database of users yet, any username and password that aren't blank should log you in.

### Feedback from the TAs & peer review

 - Manpreet Sidhu suggested I add "some images on the main page when first opening the app." He also suggested "I think having an info page or a landing page with info about the product could be useful to get a sense of what the product is before sending the user to sign-in page." I didn't add a sepearate info page, but I did add some text to the login page that gives a brief description of the app and I also added a collage of images of various projects to the login page.
 - The TA who graded my first prototype pointed out that "if no communities were joined, a blank bullet appears for the list so maybe adding "no communities joined yet" instead of having that single bullet." The blank bullet problem was fixed in the process of converting to react, but I added a no communities joined yet message anyways. She also pointed out that I wasn't verifying email addresses, so I added regex to improve that.
  - Moustafa Farag suggested I add a way to delete projects. I have added a button and a modal for this to the UI, both of which have basic functionality, but since there is no database to delete from yet, it doesn't actually remove any of the sample projects at this point.

### API I plan to use

I originally wanted to see if I could use Instagram's API to allow users to upload their pictures of their projects to their Instagram account, but after reading about the API it looks like that isn't an option. Now I am thinking of using the Google Drive API to have an option to sign in with Google and then, if the user has linked their google account, an option to upload pictures directly from drive instead of from a file on their computer.

### Questions
what is something you want to learn that will help?
- I'd like to learn about login authentication. Is it secure enough to just check usernames and passwords against information from the database or is there a different way to do it that is preferred? 

what is something you're unsure on how to implement?
- I'm unsure on how to implement the fade out that I want on the log in page for the images display. I am currently using a modified version of code I found that is supposed to do a fade over text that overflows its container and then display a "More" button to expand it (https://css-tricks.com/text-fade-read-more/ ), but it seems a little hacky. It's also applying the fading over the text I have on the bottom right my login page too, instead of just over the images (because you have to specify width in the css or else it ends up with width 0) and I can't get it so the width is exactly that of the images. Is there a better way to do this? Or do you have other suggestions for better ways to implement a decorative gallery of images?