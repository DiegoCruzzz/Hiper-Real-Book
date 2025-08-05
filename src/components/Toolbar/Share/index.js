import { h, render, Component } from "preact";
import shareLinks from "social-share-links";
import Toolbar from "../";

function activate(link, shareUrl, shareText) {
  return () => window.open(shareLinks(link, {
    url: shareUrl,
    text: shareText
  }));
}

export default function Share({ shareUrl, shareText }) {
  const items = [
    { text: "Share" },
    { text: "Facebook", icon: "facebook", onClick: activate("Facebook", shareUrl, shareText) },
    { text: "Twitter", icon: "tweet", onClick: activate("Twitter", shareUrl, shareText) },
    { text: "LinkedIn", icon: "linkedin", onClick: activate("LinkedIn", shareUrl, shareText) },
    { text: "Reddit", icon: "reddit", onClick: activate("Reddit", shareUrl, shareText) },
    { text: "WhatsApp", icon: "whatsapp", onClick: activate("WhatsApp", shareUrl, shareText) },
    { text: "Email", icon: "email", onClick: activate("Email", shareUrl, shareText) }
  ];
  return (
    <Toolbar
      variant="stacked"
      items={items}
    />
  );
}