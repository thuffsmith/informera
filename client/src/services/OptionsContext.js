import React from 'react';

export const DefaultOptions = {
    ui: {
        leftPanel: false,
        showHeader: false,
        alwaysShowSuggestionsModal: false,
    },
};

const OptionsContext = React.createContext({
    options: DefaultOptions,
    set: {},
});

export default OptionsContext;