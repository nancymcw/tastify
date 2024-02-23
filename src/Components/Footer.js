import { SocialMediaButtons } from "./SocialMediaButtons";

//Simple footer component that has the div I styled with css to make it stay on the bottom of the page.

export function Footer() {
  return (
    <div className="footer-div">
      Follow Tastify on social media!
      <br />
      <SocialMediaButtons />
    </div>
  );
}
