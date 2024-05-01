# Questionnaire
- How much time did it take you?
- How did you think about testing your code?
- How did you verify your solution meets the requirements?
- What tradeoffs did you make and why?
- Shortcuts are encouraged to keep time investment of the assignment minimal. What shortcuts did you take? Anything you specifically want to mention that you wouldn’t normally do?
- What was tricky and why?





# Assumptions
- Given assumptions
    - The event can happend and not be consumed until later
- This service should be async between the production of an event and consumption of event
- The events should exist for other consumers to access (in-memory in this case)
- An event can be consumed later than created - assumes that the metrics endpoint could not always reflect the most up to date data

- GET request for last 24 hours will be in UTC as this is an internal system

# Shortcuts
- Copy generic gitignore https://www.toptal.com/developers/gitignore/api/node
- Setting up testing https://www.digitalocean.com/community/tutorials/how-to-test-nodejs-apps-using-mocha-chai-and-sinonjs#testing-async-code
- Use of my previously written tinkering code to speed things up https://github.com/nukepowermaiden2025/apartment-r-us/tree/main


# Questionaire
