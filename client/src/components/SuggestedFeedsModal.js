/**
 * Suggested feed modal for first visit
 * displays feeds, user can select feeds to start using app
 * buttons to skip or save selections
 * (Requirements 1.a,b,c,d)
 */

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { suggestedFeeds } from '../services/feedSources';
import UserFeedService from '../services/UserFeedService';
import withFeedData from '../services/withFeedData';

const feedItems = [];
Object.keys(suggestedFeeds).forEach(feed => {
  feedItems.push({
    title: suggestedFeeds[feed],
    url: feed,
  });
});

const SuggestedFeedsModal = props => {
  const [selectedFeeds, setSelectedFeeds] = useState([]);

  const saveFeeds = onHide => {
    if (selectedFeeds.length) {
      const feedData = {};
      selectedFeeds.forEach(sf => {
        feedData[sf.url] = sf.title;
      });
      UserFeedService.addFeeds(feedData);
      props.feedData.refreshFeedData();
      onHide();
    }
  };

  const selectFeedItem = feedItem => {
    const existingIndex = selectedFeeds.findIndex(
      sf => sf.url === feedItem.url
    );
    if (existingIndex === -1) {
      selectedFeeds.push(feedItem);
      setSelectedFeeds(selectedFeeds);
    } else {
      selectedFeeds.splice(existingIndex, 1);
      setSelectedFeeds(selectedFeeds);
    }
  };

  const style = {
    display: 'flex',
    flexWrap: 'wrap',
    maxHeight: '425px',
    overflowX: 'auto',
  };

  return (
    <Modal show={props.show} centered size="lg" onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>Choose some feeds to get started</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="suggestedFeedsModalContainer scrollbars" style={style}>
          {feedItems.map(fi => (
            <FeedItem
              key={fi.title}
              feedItem={fi}
              onFeedSelected={selectFeedItem}
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="suggestedFeedsModalSaveButton"
          variant="primary"
          onClick={() => saveFeeds(props.onHide)}
        >
          Save
        </Button>
        <Button
          className="suggestedFeedsModalSkipButton"
          variant="secondary"
          onClick={props.onHide}
        >
          Skip
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const FeedItem = props => {
  const [selected, setSelected] = useState(false);

  const selectFeed = () => {
    setSelected(!selected);
    props.onFeedSelected(props.feedItem);
  };

  const style = {
    display: 'block',
    margin: '5px',
    minWidth: '11.75em',
    maxWidth: '11.75em',
    width: '11.75em',
    paddingBottom: '4em',
    cursor: 'pointer',
  };

  return (
    <Card
      className="suggestedFeedsModalItem"
      style={style}
      bg={selected ? 'secondary' : ''}
      onClick={selectFeed}
    >
      <Card.Body>
        <Card.Title>{props.feedItem.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default withFeedData(SuggestedFeedsModal);
