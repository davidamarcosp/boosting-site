import React from "react";
import Zendesk from "react-zendesk";
const ZENDESK_KEY = "3b0a6d23-1317-4a90-84bd-01fa6e5e296f";

const setting = {
  color: {
    theme: "#000"
  },
  launcher: {
    chatLabel: {
      "en-US": "Need Help"
    }
  },
  contactForm: {
    fields: [
      { id: "description", prefill: { "*": "My pre-filled description" } }
    ]
  }
};

const LiveChat = () => {
  return <Zendesk zendeskKey={ZENDESK_KEY} {...setting} onLoaded={() => console.log('is loaded')} />;
};

export default LiveChat;