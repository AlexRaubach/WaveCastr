# WaveCastr
[![Build Status](https://travis-ci.org/Antigrapist/WaveCastr.svg?branch=master)](https://travis-ci.org/Antigrapist/WaveCastr)
[![Code Climate](https://codeclimate.com/github/Antigrapist/WaveCastr/badges/gpa.svg)](https://codeclimate.com/github/Antigrapist/WaveCastr)

A website for capturing high quality audio for podcasts or interviews. WaveCastr records from each participant's local machine and stores it in the cloud. Capturing audio locally preserves the quality and avoids voip compression. Having each participant's voice on a separate track makes it easy to produce great sounding podcasts with minimal setup.

## Using WaveCastr

Every participant will need a recent version of Chrome / Firefox, a microphone, headphones and a voip program (Skype, Google Hangouts etc).

The host should create an [account](https://wavecastr.herokuapp.com/users/sign_up), create a new episode and then share the link with the guests.


<!-- ## Screenshots -->

## Built With

* [Ruby on Rails](https://github.com/rails/rails) -- Powers the backend

* [Action Cable](https://github.com/rails/rails/tree/master/actioncable) -- Provides real time asynchronous communication

* [PostgresSQL](https://www.postgresql.org/) -- Primary data store

* [Redis](https://redis.io/) -- Data store for Action Cable

* [Recorderjs](https://github.com/chris-rudmin/Recorderjs) -- JS library that captures user audio

* [PubNub](https://www.pubnub.com/) -- Provides chat functionality

* [Amazon S3](https://aws.amazon.com/s3/) -- Stores audio files

* [Heroku](https://www.heroku.com/) -- Hosts the application

## Team Members

* Oliver Duncan

* Jonathan Hyun

* Joshua Lucas

* Alex Raubach


<!-- ## Code Status

[![Build Status](https://travis-ci.org/Antigrapist/WaveCastr.svg?branch=master)](https://travis-ci.org/Antigrapist/WaveCastr)
[![Code Climate](https://codeclimate.com/github/Antigrapist/WaveCastr/badges/gpa.svg)](https://codeclimate.com/github/Antigrapist/WaveCastr) -->

## Contributing

Features and bug fixes are always welcome.

## License

WaveCastr is released under a [GNU General Public License v3.0](/license.txt).
