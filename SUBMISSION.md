### Design and implementation aspects

This is the MVP frontend app to allow teachers (guides) to submit teaching availability at GetSetUp.

It is written with React, Typescript, Jest, React Test Libary. I also use MUI as component libary so the UI look beautiful.

Navigation and app state are managed locally. All other datas are fetched from backend services.

Getting data from backend are managed by hooks. These hooks allow checking state of the api calls, if data is loading, or if data loaded, or if error occurred.

### Further Improvements

Due to time constraints, this app has a lot of limitations, which are:

1. For better experience for older adults, a calendar style for list of teaching availability will be simpler and more intuitive for users
2. Validation on teaching availability timeslot to not allow duplicated time, or overlapping time, or time outside of certain hours
3. UI that have better user experience flow to search for teaching availability, submit teaching availability for a given week
4. More unit tests to make sure functionality of the app is working as expected
5. Add more features to make it more useful for users
