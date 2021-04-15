import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  const youtubeChannelId = require("get-youtube-channel-id");

  const API_KEY = "AIzaSyC7kKmrA1Fd_nG0afb08tyXshVKva0c060";

  const [subscribers, setSubscribers] = useState(null);
  const [views, setViews] = useState(null);
  const [videos, setVideos] = useState(null);

  const [url, setUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await youtubeChannelId(url);
    fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${result.id}&key=${API_KEY}`
    )
      .then((data) => data.json())
      .then((result) => {
        console.log(result);
        if (result.items) {
          setSubscribers(result.items[0].statistics.subscriberCount);
          setViews(result.items[0].statistics.viewCount);
          setVideos(result.items[0].statistics.videoCount);
        }
      });

    console.log(result);
  };

  // const handleChange = (e) => {
  //   setUrl(e.target.value);
  // };
  return (
    <div className="App">
      <br />
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="channelUrl">
          <Form.Label>Channel URL:</Form.Label>
          <Form.Control
            type="text"
            name="url"
            onChange={handleChange}
            value={url}
            required
            placeholder="Enter Channel URL"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      You have {subscribers} subscribers
      <br />
      You have {videos} Videos
      <br />
      You have {views} Views
    </div>
  );
}

export default App;
