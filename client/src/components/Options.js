/**
 * Options panel for common options, button for more options
 * (Requirements 2.a, 2.b)
 */

import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OptionsModal from './OptionsModal';
import OptionsContext from '../services/OptionsContext';
import SwitchOption from './SwitchOption';

const Options = () => {
  const [OptionsModalVisible, setOptionsModalVisible] = useState(false);

  return (
    <OptionsContext.Consumer>
      {({ options, set }) => (
        <Card className="panelItem">
          <Card.Body>
            <h4 className="text-truncate">Options</h4>
            <hr />
            <Form>
              <Form.Group controlId="chkAlign">
                <SwitchOption
                  id="chkAlign"
                  label="Left Align Panels"
                  onChange={() => set.leftPanel()}
                  checked={options.ui.leftPanel}
                />
              </Form.Group>
              <Form.Group controlId="chkHeader">
                <SwitchOption
                  id="chkHeader"
                  label="Show Header"
                  onChange={() => set.showHeader()}
                  checked={options.ui.showHeader}
                />
              </Form.Group>
              <Form.Group controlId="chkSuggestions">
                <SwitchOption
                  id="chkSuggestions"
                  label="Always Show Suggestions Modal"
                  onChange={() => set.alwaysShowSuggestionsModal()}
                  checked={options.ui.alwaysShowSuggestionsModal}
                />
              </Form.Group>
              <Form.Group controlId="chkSuggestedFeeds">
                <SwitchOption
                  id="chkSuggestedFeeds"
                  label="Show Suggested Feeds"
                  onChange={() => set.showSuggestedFeeds()}
                  checked={options.ui.showSuggestedFeeds}
                />
              </Form.Group>
              <Form.Group controlId="chkRemoveFeeds">
                <SwitchOption
                  id="chkRemoveFeeds"
                  label="Show Remove Feeds"
                  onChange={() => set.showRemoveFeeds()}
                  checked={options.ui.showRemoveFeeds}
                />
              </Form.Group>
            </Form>
            <Button
              className="panelButton"
              size="sm"
              variant="primary"
              style={{ display: 'block', width: '100%' }}
              onClick={() => setOptionsModalVisible(true)}
            >
              More Options
            </Button>
            <OptionsModal
              show={OptionsModalVisible}
              hide={() => setOptionsModalVisible(false)}
            />
          </Card.Body>
        </Card>
      )}
    </OptionsContext.Consumer>
  );
};

export default Options;
