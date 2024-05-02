# Questionnaire
- How much time did it take you? 6hrs - Set up and finding free tooling for testing kafka consumer and producer was likely 3 hours of that.
- How did you think about testing your code?
    - Create cases for different event types to test counts 
    - Multiple users on one account to test non duplicate users
    - Multiple different time combinations to test early return and 24hr window
    
- How did you verify your solution meets the requirements?
    - I used postman to create post to my endpoint for multiple scenarios
    - Used the get endpoint to check the results
- What tradeoffs did you make and why?
    - I opted for using Enum to  handle the eventTypes for consistency but did not save them as Enum values to cut down on the complexity of mapping them by value. Likely could have used a constant here but I would be inclined to have certain event types if a DB were involved.
    - I redundantly stored the create date as a parsed date as well. Since it was a number I decided a few extra bytes would probably be given this is a low volume solution. It is possible that scale might suggest not doing that and instead doing a Date parse as needed would be better. I stuck with the choice for simplicity
- Shortcuts are encouraged to keep time investment of the assignment minimal. What shortcuts did you take? Anything you specifically want to mention that you wouldn’t normally do?
    - I add the consumer to the same service. Previously the consumer would live in a different service to seperate the layers so that if the one part of the process went down the other could still be processing.
    - I had other code that I had written so I leverge it for this excersize. I was not sure if I should try out a native solution in NodeJs for streaming when the benefits of Kafka library were top of mind. For a leaner solution perhaps an investment in time would have been nice
    - I stuck to the most happiest of paths. Normally - I would use a library like 'zod' to do some validation of requests
    - I would have added unit tests
- What was tricky and why?
 - Attempting to come up with an async solution within 2 hours where there is an element that application could be offline and the message would be consumed later was not obvious so I went over on time 
 - Testing async is always tricky but I had fun and found some other open source tooling





# Assumptions
* Given assumptions
    - The event can happen and not be consumed until later
    - The metrics count for event types and unique users are for 24 hour period

* POST
- This service should be async between the production of an event and consumption of event
- The events should exist for other consumers to access (in-memory in this case)
- An event can be consumed later than created - assumes that the metrics endpoint could not always reflect the most up to date data
- Assumes that the service will recieve createAt time as UTC
- Status response of 202 since its async

* GET 
- Request for last 24 hours will be in UTC as this is an internal system

# Shortcuts
- Copy generic gitignore https://www.toptal.com/developers/gitignore/api/node
- Setting up testing https://www.digitalocean.com/community/tutorials/how-to-test-nodejs-apps-using-mocha-chai-and-sinonjs#testing-async-code
- Use of my previously written tinkering code to speed things up https://github.com/nukepowermaiden2025/apartment-r-us/tree/main


# Questionaire
