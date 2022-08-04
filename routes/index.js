var express = require('express');
var router = express.Router();

async function initRun(){
  let userEmail = 'my.email@example.com';
  let userPassword = 'MySecretPassword';
  let dataString ='2019-02-18';

  const { GarminConnect } = require('garmin-connect');
  // Create a new Garmin Connect Client
  const GCClient = new GarminConnect();
  // Uses credentials from garmin.config.json or uses supplied params
  await GCClient.login(userEmail, userPassword);

  // Receive basic user information
  const userInfo = await GCClient.getUserInfo();
  console.log('userInfo=', userInfo);

  // Receive social user information
  const socialInfo = await GCClient.getSocialProfile();
  console.log('socialInfo=', socialInfo);

  // Get a list of all social connections
  const socialConnectionsInfo = GCClient.getSocialConnections();
  console.log('socialConnectionsInfo=', socialConnectionsInfo);

  // Get a list of all registered devices including model numbers and firmware versions.
  const deviceInfo = GCClient.getDeviceInfo();
  console.log('deviceInfo=', deviceInfo);

  // Get a list of default length with most recent activities
  const activities = GCClient.getActivities();
  console.log('activities=', activities);

  // Get activities 10 through 15. (start 10, limit 5)
  const activitiesRange = GCClient.getActivities(10, 5);
  console.log('activitiesRange=', activitiesRange);

  const activitiesRangeTwo = await GCClient.getActivities(0, 1);
  const id = activitiesRangeTwo[0].activityId;
  // Use the id as a parameter 
  const getActivity = GCClient.getActivity({ activityId: id });
  console.log('getActivity=', getActivity);
  // Or the whole activity response
  const getActivityTwo = GCClient.getActivity(activities[0]);
  console.log('getActivityTwo=', getActivityTwo);

  // Get the news feed with a default length with most recent activities
  const getNewsFeed = GCClient.getNewsFeed();
  console.log('getNewsFeed=', getNewsFeed);

  // Get activities in feed, 10 through 15. (start 10, limit 5)
  const getNewsFeedRange = GCClient.getNewsFeed(10, 5);
  console.log('getNewsFeedRange=', getNewsFeedRange);

  // Download original activity data
  // const [activity] = await GCClient.getActivities(0, 1);
  // // Directory path is optional and defaults to the current working directory.
  // // Downloads filename will be supplied by Garmin.
  // GCClient.downloadOriginalActivityData(activity, './some/path/that/exists');

  const steps = await GCClient.getSteps(new Date(dataString));
  // console.log('steps=', steps);

  // This will default to today if no date is supplied
  const heartRate = await GCClient.getHeartRate(new Date(dataString));
  console.log('heartRate=', heartRate);

  // This will default to today if no date is supplied
  const sleep = await GCClient.getSleep(new Date(dataString));
  console.log('sleep=', sleep);

  // This will default to today if no date is supplied
  const detailedSleep = await GCClient.getSleepData(new Date('2020-03-24'));
  console.log('detailedSleep=', detailedSleep);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  initRun();
  res.render('index', { title: 'Express' });
});

module.exports = router;
